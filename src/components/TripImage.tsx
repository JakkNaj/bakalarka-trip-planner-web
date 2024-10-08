import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ImageUploadButton } from './ImageUploadButton';

interface TripImageProps {
    imageUrl?: string;
    tripId: number;
    showUploadButton?: boolean;
}

export const TripImage = ({ imageUrl, tripId, showUploadButton = false }: TripImageProps) => {
    const [placeholderImage, setPlaceholderImage] = useState<string | null>(null);

    useEffect(() => {
        const placeholderImages = [
            () => import('../assets/placeholders/annie-spratt-unsplash-trip-photo.png'),
            () => import('../assets/placeholders/deactivated-account-unsplash-luggage.png'),
            () => import('../assets/placeholders/nils-nedel-unsplash-plane-side.png'),
        ];
    
        const loadPlaceholderImage = async () => {
            const index = tripId % placeholderImages.length;
            const { default: image } = await placeholderImages[index]();
            setPlaceholderImage(image);
        };

        if (!imageUrl) {
            loadPlaceholderImage();
        }
    }, [imageUrl, tripId]);

    return (
        <Styled.Container>
            <Styled.ImageContainer>
                <Styled.StyledImage src={imageUrl || placeholderImage!} alt="Trip Image" />
            </Styled.ImageContainer>
            {showUploadButton && (
                <ImageUploadButton tripId={tripId}/>
            )}
        </Styled.Container>
    );
};
const Styled = {
    Container: styled.div({
        width: '100%',
        maxWidth: '16rem',
        '@media (max-width: 50rem)': {
            display: 'none',
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }),
    ImageContainer: styled.div({
        width: '100%',
        height: '16rem',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f0f0f0',
    }),
    StyledImage: styled.img({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    }),
}


