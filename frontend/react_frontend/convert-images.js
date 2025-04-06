const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const conversions = [
  { input: 'assets/icon.svg', output: 'assets/icon.png', width: 1024, height: 1024 },
  { input: 'assets/splash.svg', output: 'assets/splash.png', width: 2048, height: 2048 },
  { input: 'assets/adaptive-icon.svg', output: 'assets/adaptive-icon.png', width: 1024, height: 1024 },
  { input: 'assets/favicon.svg', output: 'assets/favicon.png', width: 32, height: 32 }
];

async function convertImages() {
  for (const { input, output, width, height } of conversions) {
    try {
      const inputBuffer = fs.readFileSync(input);
      await sharp(inputBuffer)
        .resize(width, height)
        .png()
        .toFile(output);
      console.log(`Converted ${input} to ${output}`);
    } catch (error) {
      console.error(`Error converting ${input}:`, error);
    }
  }
}

convertImages(); 