module.exports = {
  content: [
    "../**/*.html",
    "../**/*.{js,ts}",  // catches makeMobileSlide/makeDesktopCard, etc.
  ],
  theme: {
    extend: {
      colors: {
        parchment:"#f3e7ca94",
        canvas:"#FFFFFF",
        wordcolor:"#3d5d7d",
        ink:"#1F2937",
        line:"#E7E5E4",
        whisper:"#F5F5F4",
        white:"#FFFFFF",
        accent:"#3F3F46",
        beige:"rgb(233 225 216)",
      },
      fontFamily:{ header:['"Helvetica Neue"',"Helvetica","Arial","sans-serif"] },
    },
  },
  plugins:[require("@tailwindcss/aspect-ratio")],
  safelist: [
    // classes you build in JS/templates
    "aspect-square","aspect-video","aspect-[3/2]","aspect-[16/9]",
    'h-64','w-auto','max-w-full','object-contain','cursor-pointer',
    'transition-transform','duration-500','ease-out','hover:scale-105','group-hover:scale-105',
    'rounded-xl','overflow-hidden','bg-black','text-center','text-sm','font-medium','text-wordcolor',
    'mt-3','p-2','md:p-3','md:text-base','bg-white/80','backdrop-blur-sm',
    'col-span-12','sm:col-span-6','md:col-span-4','grid','grid-cols-12','gap-4','pointer-events-none'
  ],
  // corePlugins: { preflight: false }, // uncomment if the reset messes visuals
};
