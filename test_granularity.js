import { segmentText } from './src/utils/textProcessor.js';

const text = "速読くんは、誰でも簡単に速読ができるWebアプリです。短い文章を瞬間的に表示することで、脳の処理速度を向上させます。";

console.log("--- Level 1 (Words) ---");
console.log(segmentText(text, 1));

console.log("\n--- Level 3 (Default/Medium) ---");
console.log(segmentText(text, 3));

console.log("\n--- Level 5 (Sentences) ---");
console.log(segmentText(text, 5));
