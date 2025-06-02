import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const sourcePath = resolve(projectRoot, 'dist', 'index.html');
const targetPath = resolve(projectRoot, 'dist', '404.html');

// Ensure dist directory exists
const distDir = resolve(projectRoot, 'dist');
if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

// Copy index.html to 404.html
try {
    copyFileSync(sourcePath, targetPath);
    console.log('Successfully copied index.html to 404.html');
} catch (error) {
    console.error('Error copying file:', error);
    process.exit(1);
}
