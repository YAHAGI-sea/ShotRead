export const segmentText = (text, granularity = 3) => {
  if (!text) return [];

  // Level 5: Sentence splitting (very coarse)
  if (granularity >= 5) {
    const chunks = [];
    let buffer = "";
    // Split ensuring we keep delimiters. 
    // Note: \n split might be good too.
    const parts = text.split(/([、。！？,.!?\n]+)/);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      // If it's punctuation/delimiter
      if (/^[、。！？,.!?\n]+$/.test(part)) {
        buffer += part;
        if (buffer.trim()) chunks.push(buffer);
        buffer = "";
      } else {
        // If we have a buffer from previous iteration that wasn't flushed
        if (buffer) chunks.push(buffer);
        buffer = part;
      }
    }
    if (buffer.trim()) chunks.push(buffer);
    return chunks;
  }

  const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'word' });
  const rawSegments = [...segmenter.segment(text)].map(s => s.segment);

  // Level 1: Word/Raw segments (very fine)
  if (granularity === 1) {
    // Return all segments including whitespace to preserve spacing
    return rawSegments;
  }

  const chunks = [];
  let buffer = "";

  // Define target lengths based on granularity
  // Level 2: 2-4 chars
  // Level 3: 5-10 chars (Default)
  // Level 4: 10-20 chars
  let minLength = 5;
  if (granularity === 2) minLength = 3;
  if (granularity === 4) minLength = 10;

  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i];
    // Removed filtering of whitespace to preserve spaces between words
    // if (seg.trim() === "") continue;

    const isPunctuation = /^[、。！？,.!?]$/.test(seg);
    const isClosingBracket = /^[」』）\}\]]$/.test(seg);
    const isOpeningBracket = /^[「『（\{\[]$/.test(seg);

    if (buffer.length === 0) {
      buffer = seg;
    } else {
      // Logic from before:
      // Punctuation ends chunk
      if (isPunctuation || isClosingBracket) {
        buffer += seg;
        chunks.push(buffer);
        buffer = "";
        continue;
      }

      // Opening bracket starts new chunk (flush old)
      if (isOpeningBracket) {
        if (buffer.length > 0) chunks.push(buffer);
        buffer = seg;
        continue;
      }

      // Length check
      if (buffer.length >= minLength) {
        chunks.push(buffer);
        buffer = seg;
      } else {
        buffer += seg;
      }
    }
  }

  if (buffer.length > 0) {
    chunks.push(buffer);
  }

  return chunks;
};
