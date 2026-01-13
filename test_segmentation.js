import { segmentText } from './src/utils/textProcessor.js';

const text = "速読くんは、誰でも簡単に速読ができるWebアプリです。短い文章を瞬間的に表示することで、脳の処理速度を向上させます。";
const chunks = segmentText(text);

console.log("Input:", text);
console.log("Chunks:", chunks);
console.log("Chunk Counts:", chunks.length);
