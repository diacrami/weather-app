/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      backgroundImage: {
        'clear': "url('/assets/videos/clear.mp4')",
        'cloud': "url('/assets/videos/clud.mp4')",
        'drizzle': "url('/assets/videos/drizzle.mp4')",
        'rain': "url('/assets/videos/rain.mp4')",
        'snow': "url('/assets/videos/snow.mp4')",

      }
    },
  },
  plugins: [],
}

