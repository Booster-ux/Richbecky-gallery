import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function copyArtworkImagesPlugin() {
  return {
    name: 'copy-artwork-images',
    buildStart() {
      const publicArtworksDir = path.resolve(__dirname, 'public/images/artworks');
      if (!fs.existsSync(publicArtworksDir)) {
        fs.mkdirSync(publicArtworksDir, { recursive: true });
      }

      const brainDir = 'C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7';

      const mappings = [
        {
          target: 'isembaye.jpg',
          sources: [
            path.join(brainDir, 'media__1786288555178.jpg'),
            path.join(brainDir, 'artwork_1_blue_gold_1786281890336.png')
          ]
        },
        {
          target: 'this_is_our_way.jpg',
          sources: [
            path.join(brainDir, 'media__1786288739763.jpg')
          ]
        },
        {
          target: 'the_first_dialogue.jpg',
          sources: [
            path.join(brainDir, 'media__1786288845976.jpg')
          ]
        },
        {
          target: 'under_our_new_garment.jpg',
          sources: [
            path.join(brainDir, 'media_5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7_1786293253335.png'),
            path.join(brainDir, 'media__1786289008243.jpg')
          ]
        },
        {
          target: 'thought_of_hope.jpg',
          sources: [
            path.join(brainDir, 'media_5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7_1786293199005.jpg'),
            path.join(brainDir, 'media__1786289110407.jpg')
          ]
        }
      ];

      for (const item of mappings) {
        const dest = path.join(publicArtworksDir, item.target);
        if (!fs.existsSync(dest)) {
          for (const src of item.sources) {
            if (fs.existsSync(src)) {
              try {
                fs.copyFileSync(src, dest);
                console.log(`Successfully copied ${src} to ${dest}`);
                break;
              } catch (err) {
                console.error(`Failed to copy ${src}:`, err);
              }
            }
          }
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), copyArtworkImagesPlugin()],
  server: {
    port: 3000,
    open: true
  }
});
