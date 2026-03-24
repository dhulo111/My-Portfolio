import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/8c06f44e-23aa-4f41-a088-2b457e931fe6';
const destFile = path.join(process.cwd(), 'src', 'textures.js');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png') && f.includes('_texture_'));

let out = `// Auto-generated texture base64 assets\n\n`;

for(const file of files) {
    const pName = file.split('_texture_')[0];
    const data = fs.readFileSync(path.join(srcDir, file));
    const b64 = data.toString('base64');
    out += `export const ${pName}Map = "data:image/png;base64,${b64}";\n`;
}

// Add the fixed ones that didn't fail
out += `export const earthMap = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";\n`;
out += `export const earthNormalMap = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";\n`;
out += `export const earthSpecularMap = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";\n`;
out += `export const earthCloudsMap = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png";\n`;
out += `export const moonMap = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg";\n`;

fs.writeFileSync(destFile, out);
console.log('Texture base64 file written successfully!');
