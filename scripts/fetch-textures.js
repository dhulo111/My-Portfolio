import fs from 'fs';
import https from 'https';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'planets');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Fixed URLs to use `main` instead of `master` for modern github default branches
const REPOS = [
    {
        base: 'https://raw.githubusercontent.com/josh-hemphill/solar-system/main/public/textures/',
        ext: 'jpg',
        files: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
    },
    {
        base: 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/images/',
        ext: 'jpg',
        files: ['sunmap', 'mercurymap', 'venusmap', 'earthmap1k', 'marsmap1k', 'jupitermap', 'saturnmap', 'uranusmap', 'neptunemap']
    },
    {
        base: 'https://raw.githubusercontent.com/manoloedge/solar-system-threejs/master/src/textures/',
        ext: 'jpg',
        files: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] 
    }
];

function download(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(true));
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                download(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                resolve(false);
            }
        }).on('error', reject);
    });
}

async function main() {
    const planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'saturn_ring', 'uranus', 'neptune'];
    
    for (const p of planets) {
        const filepath = path.join(PUBLIC_DIR, `${p}.jpg`);
        let success = false;
        
        for (const repo of REPOS) {
            let filename = repo.files.includes(p) ? p : (repo.files.find(f => f.startsWith(p)) || p);
            
            // special check for saturn ring
            if (p === 'saturn_ring') {
                filename = 'saturnringcolortrans';
            }
            
            const ext = p === 'saturn_ring' ? 'png' : repo.ext;
            let url = `${repo.base}${filename}.${ext}`;
            
            console.log(`Trying ${url}...`);
            success = await download(url, filepath);
            if (success) {
                console.log(`Success downloading ${p} from ${url}`);
                break; // move to next planet
            }
        }
        if (!success) {
            console.log(`FAILED completely to download ${p}`);
        }
    }
}

main().catch(console.error);
