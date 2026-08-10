// vite.config.ts
import { defineConfig } from "file:///C:/Users/USER/Desktop/Richbecky%20Gallery/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/USER/Desktop/Richbecky%20Gallery/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\USER\\Desktop\\Richbecky Gallery";
function copyArtworkImagesPlugin() {
  return {
    name: "copy-artwork-images",
    buildStart() {
      const publicArtworksDir = path.resolve(__vite_injected_original_dirname, "public/images/artworks");
      if (!fs.existsSync(publicArtworksDir)) {
        fs.mkdirSync(publicArtworksDir, { recursive: true });
      }
      const brainDir = "C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7";
      const mappings = [
        {
          target: "isembaye.jpg",
          sources: [
            path.join(brainDir, "media__1786288555178.jpg"),
            path.join(brainDir, "artwork_1_blue_gold_1786281890336.png")
          ]
        },
        {
          target: "this_is_our_way.jpg",
          sources: [
            path.join(brainDir, "media__1786288739763.jpg")
          ]
        },
        {
          target: "the_first_dialogue.jpg",
          sources: [
            path.join(brainDir, "media__1786288845976.jpg")
          ]
        },
        {
          target: "under_our_new_garment.jpg",
          sources: [
            path.join(brainDir, "media_5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7_1786293253335.png"),
            path.join(brainDir, "media__1786289008243.jpg")
          ]
        },
        {
          target: "thought_of_hope.jpg",
          sources: [
            path.join(brainDir, "media_5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7_1786293199005.jpg"),
            path.join(brainDir, "media__1786289110407.jpg")
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
var vite_config_default = defineConfig({
  plugins: [react(), copyArtworkImagesPlugin()],
  server: {
    port: 3e3,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERlc2t0b3BcXFxcUmljaGJlY2t5IEdhbGxlcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVTRVJcXFxcRGVza3RvcFxcXFxSaWNoYmVja3kgR2FsbGVyeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVVNFUi9EZXNrdG9wL1JpY2hiZWNreSUyMEdhbGxlcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmZ1bmN0aW9uIGNvcHlBcnR3b3JrSW1hZ2VzUGx1Z2luKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjb3B5LWFydHdvcmstaW1hZ2VzJyxcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgY29uc3QgcHVibGljQXJ0d29ya3NEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL2ltYWdlcy9hcnR3b3JrcycpO1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHB1YmxpY0FydHdvcmtzRGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMocHVibGljQXJ0d29ya3NEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBicmFpbkRpciA9ICdDOi9Vc2Vycy9VU0VSLy5nZW1pbmkvYW50aWdyYXZpdHktaWRlL2JyYWluLzViMzJhYzJjLTFmNDMtNGMyOC1hMDViLTVjOWRkOTFkYmFkNyc7XG5cbiAgICAgIGNvbnN0IG1hcHBpbmdzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiAnaXNlbWJheWUuanBnJyxcbiAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICBwYXRoLmpvaW4oYnJhaW5EaXIsICdtZWRpYV9fMTc4NjI4ODU1NTE3OC5qcGcnKSxcbiAgICAgICAgICAgIHBhdGguam9pbihicmFpbkRpciwgJ2FydHdvcmtfMV9ibHVlX2dvbGRfMTc4NjI4MTg5MDMzNi5wbmcnKVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRhcmdldDogJ3RoaXNfaXNfb3VyX3dheS5qcGcnLFxuICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgIHBhdGguam9pbihicmFpbkRpciwgJ21lZGlhX18xNzg2Mjg4NzM5NzYzLmpwZycpXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiAndGhlX2ZpcnN0X2RpYWxvZ3VlLmpwZycsXG4gICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgcGF0aC5qb2luKGJyYWluRGlyLCAnbWVkaWFfXzE3ODYyODg4NDU5NzYuanBnJylcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0YXJnZXQ6ICd1bmRlcl9vdXJfbmV3X2dhcm1lbnQuanBnJyxcbiAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICBwYXRoLmpvaW4oYnJhaW5EaXIsICdtZWRpYV81YjMyYWMyYy0xZjQzLTRjMjgtYTA1Yi01YzlkZDkxZGJhZDdfMTc4NjI5MzI1MzMzNS5wbmcnKSxcbiAgICAgICAgICAgIHBhdGguam9pbihicmFpbkRpciwgJ21lZGlhX18xNzg2Mjg5MDA4MjQzLmpwZycpXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiAndGhvdWdodF9vZl9ob3BlLmpwZycsXG4gICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgcGF0aC5qb2luKGJyYWluRGlyLCAnbWVkaWFfNWIzMmFjMmMtMWY0My00YzI4LWEwNWItNWM5ZGQ5MWRiYWQ3XzE3ODYyOTMxOTkwMDUuanBnJyksXG4gICAgICAgICAgICBwYXRoLmpvaW4oYnJhaW5EaXIsICdtZWRpYV9fMTc4NjI4OTExMDQwNy5qcGcnKVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXTtcblxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG1hcHBpbmdzKSB7XG4gICAgICAgIGNvbnN0IGRlc3QgPSBwYXRoLmpvaW4ocHVibGljQXJ0d29ya3NEaXIsIGl0ZW0udGFyZ2V0KTtcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRlc3QpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBzcmMgb2YgaXRlbS5zb3VyY2VzKSB7XG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhzcmMpKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZnMuY29weUZpbGVTeW5jKHNyYywgZGVzdCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFN1Y2Nlc3NmdWxseSBjb3BpZWQgJHtzcmN9IHRvICR7ZGVzdH1gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGNvcHkgJHtzcmN9OmAsIGVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjb3B5QXJ0d29ya0ltYWdlc1BsdWdpbigpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiB0cnVlXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLG9CQUFvQjtBQUNoVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLFNBQVMsMEJBQTBCO0FBQ2pDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFDWCxZQUFNLG9CQUFvQixLQUFLLFFBQVEsa0NBQVcsd0JBQXdCO0FBQzFFLFVBQUksQ0FBQyxHQUFHLFdBQVcsaUJBQWlCLEdBQUc7QUFDckMsV0FBRyxVQUFVLG1CQUFtQixFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQUEsTUFDckQ7QUFFQSxZQUFNLFdBQVc7QUFFakIsWUFBTSxXQUFXO0FBQUEsUUFDZjtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ1AsS0FBSyxLQUFLLFVBQVUsMEJBQTBCO0FBQUEsWUFDOUMsS0FBSyxLQUFLLFVBQVUsdUNBQXVDO0FBQUEsVUFDN0Q7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ1AsS0FBSyxLQUFLLFVBQVUsMEJBQTBCO0FBQUEsVUFDaEQ7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ1AsS0FBSyxLQUFLLFVBQVUsMEJBQTBCO0FBQUEsVUFDaEQ7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ1AsS0FBSyxLQUFLLFVBQVUsOERBQThEO0FBQUEsWUFDbEYsS0FBSyxLQUFLLFVBQVUsMEJBQTBCO0FBQUEsVUFDaEQ7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ1AsS0FBSyxLQUFLLFVBQVUsOERBQThEO0FBQUEsWUFDbEYsS0FBSyxLQUFLLFVBQVUsMEJBQTBCO0FBQUEsVUFDaEQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLGlCQUFXLFFBQVEsVUFBVTtBQUMzQixjQUFNLE9BQU8sS0FBSyxLQUFLLG1CQUFtQixLQUFLLE1BQU07QUFDckQsWUFBSSxDQUFDLEdBQUcsV0FBVyxJQUFJLEdBQUc7QUFDeEIscUJBQVcsT0FBTyxLQUFLLFNBQVM7QUFDOUIsZ0JBQUksR0FBRyxXQUFXLEdBQUcsR0FBRztBQUN0QixrQkFBSTtBQUNGLG1CQUFHLGFBQWEsS0FBSyxJQUFJO0FBQ3pCLHdCQUFRLElBQUksdUJBQXVCLEdBQUcsT0FBTyxJQUFJLEVBQUU7QUFDbkQ7QUFBQSxjQUNGLFNBQVMsS0FBSztBQUNaLHdCQUFRLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxHQUFHO0FBQUEsY0FDN0M7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUM7QUFBQSxFQUM1QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
