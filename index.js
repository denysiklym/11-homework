const fs = require('fs');

const filePath = 'text.txt';
let totalWords = 0;

const readStream = fs.createReadStream(filePath, { encoding: 'latin1' });

readStream.on('data', processData);

readStream.on('end', () => {
    console.log(`Total words: ${totalWords}`);
});

function processData(chunk) {
    const chunkString = chunk.toString('utf8');
    const cleanChunk = removeANSI(chunkString);
    const lines = cleanChunk.split('\n');
    
    lines.forEach(countAndPrintWords);
}

function countAndPrintWords(line) {
    console.log(line);
    totalWords += countWords(line);
}

function countWords(line) {
    const wordRegex = /\b\w+\b/g;
    return (line.match(wordRegex) || []).length;
}

function removeANSI(text) {
    const ansiRegex = /\x1B\[[0-?]*[ -/]*[@-~]/g;
    return text.replace(ansiRegex, '');
}