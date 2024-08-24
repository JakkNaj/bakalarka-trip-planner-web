import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {fetchTripImageUrl} from "../utils/trip_api.ts";
import {useStore} from "../stores/globalStore.ts";

interface TripImageProps {
    imageUrl?: string;
    tripId: number;
}

export const TripImage = ({ imageUrl, tripId }: TripImageProps) => {
    const [placeholderImage, setPlaceholderImage] = useState<string | null>(null);

    const placeholderImages = [
        () => import('../assets/placeholders/annie-spratt-unsplash-trip-photo.png'),
        () => import('../assets/placeholders/deactivated-account-unsplash-luggage.png'),
        () => import('../assets/placeholders/nils-nedel-unsplash-plane-side.png'),
    ];

    useEffect(() => {
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
        <ImageContainer>
            <StyledImage src={imageUrl || placeholderImage!} alt="Trip Image" />
        </ImageContainer>
    );
};

const ImageContainer = styled.div({
    width: '100%',
    maxWidth: '16rem',
    height: '16rem',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#f0f0f0',
    '@media (max-width: 50rem)': {
        display: 'none',
    },
});

const StyledImage = styled.img({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
});
