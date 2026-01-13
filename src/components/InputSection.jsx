import React from 'react';

const InputSection = ({ onStart, initialText = '' }) => {
    const [text, setText] = React.useState(initialText);

    const handleStart = () => {
        if (text.trim()) {
            onStart(text);
        }
    };

    return (
        <div className="card input-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>Sokudo-kun Input</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                rows={10}
                style={{ width: '100%', marginBottom: '1rem', resize: 'vertical' }}
            />
            <button
                onClick={handleStart}
                disabled={!text.trim()}
                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}
            >
                Start Reading
            </button>
        </div>
    );
};

export default InputSection;
