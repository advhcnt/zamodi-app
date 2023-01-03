import { LoadingOverlay } from '@mantine/core';
import React from 'react';

function Chargement({visible}) {
    return (
        <LoadingOverlay visible={visible} overlayBlur={3} zIndex={9999} loaderProps={{ size: 'xl', color: '#20986e', variant: 'dots' }} />

    );
}

export default Chargement;