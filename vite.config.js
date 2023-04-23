import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
	base: './',
	root,
	build: {
		outDir,
		rollupOptions: {
			// input: {
			// 	sample1: resolve(root, 'sample1', 'index.html'),
			// 	// ディレクトリ名: resolve(root, 'ディレクトリ名', 'index.html'),
			// },
			output: {
				entryFileNames: `assets/js/script.js`,
				assetFileNames: `assets/css/style.[ext]`,
			}
		},
	},
	server: {
		port: 8080
	}
})