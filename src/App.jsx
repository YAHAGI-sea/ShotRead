import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import InputSection from './components/InputSection';
import ReaderDisplay from './components/ReaderDisplay';
import Controls from './components/Controls';
import { segmentText } from './utils/textProcessor';

function App() {
  const [view, setView] = useState('input'); // 'input' | 'reader'
  const [chunks, setChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // ms per chunk
  const [mode, setMode] = useState('auto'); // 'auto' | 'manual'
  const [granularity, setGranularity] = useState(3); // 1-5
  const [originalText, setOriginalText] = useState('');

  const timerRef = useRef(null);

  const startReading = (text) => {
    setOriginalText(text);
    const segmented = segmentText(text, granularity);
    setChunks(segmented);
    setCurrentIndex(0);
    setView('reader');
    setIsPlaying(false);
  };

  // Re-segment processing
  useEffect(() => {
    if (view === 'reader' && originalText) {
      // Calculate current progress in characters
      const currentProgressChars = chunks.slice(0, currentIndex).join('').length;

      const segmented = segmentText(originalText, granularity);
      setChunks(segmented);

      // Find new index closest to current progress
      let newIndex = 0;
      let charCount = 0;
      for (let i = 0; i < segmented.length; i++) {
        if (charCount >= currentProgressChars) {
          newIndex = i;
          break;
        }
        charCount += segmented[i].length;
      }
      // If we reached the end without exceeding, set to last
      if (charCount < currentProgressChars) {
        newIndex = segmented.length > 0 ? segmented.length - 1 : 0;
      }

      setCurrentIndex(newIndex);
      setIsPlaying(false); // Pause on change requested by user
    }
  }, [granularity]);

  const nextChunk = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= chunks.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [chunks.length]);

  const prevChunk = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const reset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const backToInput = () => {
    setIsPlaying(false);
    setView('input');
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto Mode Timer
  useEffect(() => {
    if (mode === 'auto' && isPlaying) {
      timerRef.current = setInterval(nextChunk, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [mode, isPlaying, speed, nextChunk]);

  // Keyboard Shortcuts
  useEffect(() => {
    if (view !== 'reader') return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (mode === 'auto') {
          togglePlay();
        } else {
          nextChunk();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextChunk();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevChunk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, mode, nextChunk, prevChunk, togglePlay]);

  return (
    <div className="app-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{
          margin: 0,
          background: 'linear-gradient(90deg, #3182CE, #63B3ED)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '900',
          letterSpacing: '-1px'
        }}>
          ShotRead
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem', fontWeight: 'bold' }}>
          SOKUDO-KUN
        </p>
      </header>

      <main>
        {view === 'input' ? (
          <>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Instant Speed Reader
            </p>
            <InputSection onStart={startReading} initialText={originalText} />
          </>
        ) : (
          <div className="card reader-card">
            <ReaderDisplay
              currentChunk={chunks[currentIndex]}
              progress={chunks.length ? ((currentIndex + 1) / chunks.length) * 100 : 0}
            />
            <Controls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              speed={speed}
              onSpeedChange={setSpeed}
              mode={mode}
              onModeChange={(m) => {
                setMode(m);
                setIsPlaying(false); // Pause on mode switch
              }}
              granularity={granularity}
              onGranularityChange={setGranularity}
              onReset={reset}
              onBack={backToInput}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
