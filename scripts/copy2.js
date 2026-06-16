import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/8c06f44e-23aa-4f41-a088-2b457e931fe6';
const destDir = path.join(process.cwd(), 'public', 'planets');

const files = fs.readdirSync(srcDir);
for(const file of files) {
    if(file.endsWith('.png') && file.includes('_texture_')) {
        const pName = file.split('_texture_')[0];
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, pName + '.png'));
    }
}
