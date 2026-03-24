import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\8c06f44e-23aa-4f41-a088-2b457e931fe6';
const destDir = path.join(process.cwd(), 'public', 'planets');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    if (file.includes('_texture_') && file.endsWith('.png')) {
        const planetName = file.split('_texture_')[0];
        const destFile = path.join(destDir, `${planetName}.png`);
        fs.copyFileSync(path.join(srcDir, file), destFile);
        console.log(`Copied ${planetName}.png`);
    }
});
