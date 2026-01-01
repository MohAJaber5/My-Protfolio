import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const MobileDev3DBackground = () => {
    const { theme } = useTheme();

    return (
        <div
            className="fixed top-0 left-0 w-full h-full -z-10"
            style={{
                background: theme === 'dark' ? '#000000' : '#ffffff'
            }}
        />
    );
};

export default MobileDev3DBackground;
