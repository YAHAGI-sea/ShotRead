# ShotRead (SOKUDO-KUN)

> This project was created using **Antigravity's Agent Manager Mode**.

**ShotRead** (formerly SOKUDO-KUN) is an instant speed reader web application designed to help you consume text efficiently. By breaking down text into manageable chunks and displaying them sequentially at adjustable speeds, ShotRead minimizes eye movement and improves reading speed.

[**Live Demo**](https://yahagi-sea.github.io/ShotRead/)

![ShotRead Screenshot](https://via.placeholder.com/800x400?text=ShotRead+Screenshot+Placeholder)

## Features

-   **Granular Control**: Adjust text chunking from fine (word-level) to coarse (sentence-level) with 5 granularity levels.
-   **Smart Playback**:
    -   **Position Preservation**: Changing granularity automatically pauses and keeps your place in the text.
    -   **Resume Capability**: Playback pauses automatically when switching modes or settings.
-   **Dual Modes**:
    -   **Auto (Timer)**: Reads automatically at your set speed (ms per chunk).
    -   **Manual**: Control the pace yourself using keyboard shortcuts or on-screen buttons.
-   **Text Preservation**: Seamlessly switch between the Input and Reader views without losing your text.
-   **Responsive Design**: Optimized for readability with dynamic text wrapping for long segments.
-   **Multi-language Support**: Optimized for both Japanese and English (preserves spacing correctly).

## Technology Stack

-   **Frontend**: React
-   **Build Tool**: Vite
-   **Styling**: CSS Modules / Vanilla CSS

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shotread.git
    cd shotread
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage

1.  **Input Text**: Paste the text you want to read into the text area.
2.  **Start Reading**: Click the "Start Reading" button.
3.  **Adjust Settings**:
    -   **Speed**: Use the slider to change the display duration (ms).
    -   **Chunk**: Use the slider to change how much text appears at once (Lv.1 - Lv.5).
4.  **Controls**:
    -   `Space`: Play / Pause
    -   `Right Arrow`: Next chunk (Manual mode)
    -   `Left Arrow`: Previous chunk (Manual mode)


## License

This project is licensed under the MIT License.


