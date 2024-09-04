import { ChangeEvent, useRef, useState } from 'react';
import { useStore } from '../stores/globalStore';
import { uploadTripImage } from "../utils/trip_api.ts";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import { colors } from "../assets/colors.ts";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@mui/material";

interface ImageUploadButtonProps {
    tripId: number;
}

export const ImageUploadButton = ({ tripId }: ImageUploadButtonProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, setTripImage } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null!);

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploading(true);
            setError(null);
            const url = await uploadTripImage(tripId, user?.id, file);
            if (url) {
                setTripImage(tripId, url);
            }
        } catch (e: unknown) {
            setError((e as Error).message);
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
                />
                {!uploading ? (
                    <Styled.UploadButton type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                        <Styled.UploadIcon className="white-hover"/>
                        Upload Image
                    </Styled.UploadButton>
                ) : (
                    <CircularProgress size={24} style={{color: colors.mainBlue}} />
                )}
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

const Styled = {
    UploadButton: styled(Button)({
        color: colors.headingText,
        fontSize: "1rem",
        textTransform: "lowercase",
        padding: "0.2rem 0.4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.4rem",
        borderRadius: "0.25rem",
        '&:hover': {
            backgroundColor: colors.mainBlue,
            color: colors.white,
            "& .white-hover": {
                color: colors.white,
            },
        },
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "24%",
            width: "38%",
            borderBottom: `0.125rem solid ${colors.mainBlue}`,
        },
    }),
    UploadIcon: styled(UploadIcon)({
        cursor: 'pointer',
        color: colors.mainBlue,
        borderRadius: '10%',
    }),
}