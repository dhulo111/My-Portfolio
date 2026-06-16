import fs from 'fs';
import https from 'https';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'planets');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Very stable textures from a reliable three.js educational repository
const TEXTURES = {
    sun: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/sun.jpg',
    mercury: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/mercury.jpg',
    venus: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/venus.jpg',
    earth: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/earth.jpg',
    mars: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/mars.jpg',
    jupiter: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/jupiter.jpg',
    saturn: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/saturn.jpg',
    saturn_ring: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/saturn_ring.png',
    uranus: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/uranus.jpg',
    neptune: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/master/public/textures/neptune.jpg',
};

// If josh's repo fails, here is a fallback map using another github repo:
const FALLBACK_TEXTURES = {
  sun: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/sunmap.jpg',
  mercury: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/mercurymap.jpg',
  venus: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/venusmap.jpg',
  earth: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/earthmap1k.jpg',
  mars: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/marsmap1k.jpg',
  jupiter: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/jupitermap.jpg',
  saturn: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/saturnmap.jpg',
  saturn_ring: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/saturnringcolortrans.png',
  uranus: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/uranusmap.jpg',
  neptune: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/neptunemap.jpg'
}

async function download(url, filepath, fallbackUrl) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve());
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                download(res.headers.location, filepath, fallbackUrl).then(resolve).catch(reject);
            } else if (fallbackUrl) {
                console.log(`Failed to download ${url}, trying fallback...`);
                download(fallbackUrl, filepath, null).then(resolve).catch(reject);
            } else {
                // If everything fails, write an empty file so it doesn't crash
                fs.writeFileSync(filepath, '');
                resolve();
            }
        }).on('error', (err) => {
             if (fallbackUrl) {
                console.log(`Failed ${url}: ${err.message}. Trying fallback...`);
                download(fallbackUrl, filepath, null).then(resolve).catch(reject);
             } else {
                fs.writeFileSync(filepath, '');
                resolve();
             }
        });
    });
}

async function main() {
    for (const [name, url] of Object.entries(TEXTURES)) {
        const ext = url.split('.').pop();
        const filepath = path.join(PUBLIC_DIR, `${name}.${ext}`);
        if (!fs.existsSync(filepath) || fs.statSync(filepath).size === 0) {
            console.log(`Downloading ${name}...`);
            await download(url, filepath, FALLBACK_TEXTURES[name]);
        } else {
            console.log(`Skipping ${name}, already downloaded.`);
        }
    }
}

main().catch(console.error);
