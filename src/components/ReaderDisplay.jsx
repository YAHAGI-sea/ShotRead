import React from 'react';

const ReaderDisplay = ({ currentChunk, progress, isPlaying }) => {
    return (
        <div className="reader-display-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            width: '100%',
            position: 'relative'
        }}>
            <div className="chunk-display" style={{
                fontSize: '4rem',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                transition: 'opacity 0.1s ease',
                textAlign: 'center',
                maxWidth: '90%',
                wordBreak: 'break-word',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {currentChunk || "Ready"}
            </div>

            {/* Progress Bar */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '10%',
                width: '80%',
                height: '4px',
                backgroundColor: '#E2E8F0',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: 'var(--color-accent)',
                    transition: 'width 0.2s linear'
                }} />
            </div>

            {/* Focus Point/Center Marker (Optional, helps speed reading) */}
            <div style={{
                position: 'absolute',
                top: '40%', // Slightly above center
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                backgroundColor: 'var(--color-accent)',
                opacity: 0.3,
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
        </div >
    );
};

export default ReaderDisplay;
