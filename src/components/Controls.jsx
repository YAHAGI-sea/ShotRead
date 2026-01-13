import React from 'react';

const Controls = ({
    isPlaying,
    onTogglePlay,
    speed,
    onSpeedChange,
    mode,
    onModeChange,
    granularity,
    onGranularityChange,
    onReset,
    onBack
}) => {
    return (
        <div className="controls-container" style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
        }}>

            <div className="playback-controls" style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={onBack} title="Back to Input" style={{ fontWeight: 'bold' }}>Back</button>
                <button onClick={onReset} title="Reset to Start">⏮</button>
                <button
                    onClick={() => !isPlaying && onTogglePlay()}
                    disabled={isPlaying}
                    title="Play"
                    style={{
                        minWidth: '50px',
                        fontSize: '1.2rem',
                        opacity: isPlaying ? 0.6 : 1,
                        cursor: isPlaying ? 'default' : 'pointer'
                    }}
                >
                    ▶
                </button>
                <button
                    onClick={() => isPlaying && onTogglePlay()}
                    disabled={!isPlaying}
                    title="Pause"
                    style={{
                        minWidth: '50px',
                        fontSize: '1.2rem',
                        opacity: !isPlaying ? 0.6 : 1,
                        cursor: !isPlaying ? 'default' : 'pointer'
                    }}
                >
                    ⏸
                </button>
            </div>

            <div className="settings-controls" style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <div className="mode-switch">
                    <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Mode:</label>
                    <select
                        value={mode}
                        onChange={(e) => onModeChange(e.target.value)}
                        style={{ padding: '0.4rem', borderRadius: '4px' }}
                    >
                        <option value="auto">Auto (Timer)</option>
                        <option value="manual">Manual (Keyboard)</option>
                    </select>
                </div>

                {mode === 'auto' && (
                    <div className="speed-control" style={{ display: 'flex', items: 'center', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 'bold' }}>Speed:</label>
                        <input
                            type="range"
                            min="100"
                            max="2000"
                            step="50"
                            value={speed}
                            onChange={(e) => onSpeedChange(Number(e.target.value))}
                        />
                        <span style={{ minWidth: '60px', textAlign: 'left' }}>{speed} ms</span>
                    </div>
                )}

                <div className="granularity-control" style={{ display: 'flex', items: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Chunk:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={granularity || 3}
                        onChange={(e) => onGranularityChange(Number(e.target.value))}
                        title="1: Fine, 5: Coarse"
                    />
                    <span style={{ minWidth: '30px', textAlign: 'left' }}>Lv.{granularity || 3}</span>
                </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                {mode === 'manual'
                    ? 'Press SPACE or → to advance, ← to go back.'
                    : 'Press SPACE to Play/Pause.'}
            </div>
        </div>
    );
};

export default Controls;
