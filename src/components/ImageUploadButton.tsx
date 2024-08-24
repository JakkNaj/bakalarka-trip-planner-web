import { ChangeEvent, useRef, useState } from 'react';
import supabase from '../config/supabaseClient';
import { useStore } from '../stores/globalStore';
import {fetchTripImageUrl} from "../utils/trip_api.ts";

interface ImageUploadButtonProps {
    tripId: number;
    onUploadSuccess: (imageUrl: string) => void;
}

export const ImageUploadButton = ({ tripId, onUploadSuccess }: ImageUploadButtonProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null!);

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        console.log("Reacting to file upload: ", tripId);

        if (!file) return;

        try {
            setUploading(true);
            setError(null);

            const filePath = `${user?.id}/${tripId}/trip-image.jpg`;
            console.log('Uploading image to:', filePath);

            // list existing images in the trip folder
            const { data: existingImages, error: listError } = await supabase
                .storage
                .from('trip_images')
                .list(`${user?.id}/${tripId}`);

            if (listError) {
                throw new Error(`Error listing images: ${listError.message}`);
            }

            // delete existing images
            if (existingImages) {
                for (const image of existingImages) {
                    const { error: deleteError } = await supabase
                        .storage
                        .from('trip_images')
                        .remove([`${user?.id}/${tripId}/${image.name}`]);

                    if (deleteError) {
                        console.error(`Error deleting image: ${deleteError.message}`);
                    }
                }
            }

            // upload new image
            const { error: uploadError } = await supabase
                .storage
                .from('trip_images')
                .upload(filePath, file);

            if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`);
            }

            const url = await fetchTripImageUrl(tripId, user?.id)
            if (url) {
                onUploadSuccess(url);
            }

        } catch (e) {
            setError(e.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label htmlFor="image-upload">
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    disabled={uploading}
                />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};