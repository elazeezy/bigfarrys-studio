import { motion } from "framer-motion";

// Reduced to 5 high-impact images for a cleaner, luxury look
const REFINED_GALLERY = [
  { src: "/home/collage/advert-1.jpg", label: "ADVERT" },
  { src: "/home/collage/edit-1.jpg", label: "EDIT" },
  { src: "/home/collage/cac-1.jpg", label: "CAC" },
  { src: "/home/collage/signage-1.jpg", label: "SIGNS" },
  { src: "/image_cad10a.jpg", label: "FEATURE" }, 
];

// Duplicate the set to ensure the infinite loop never breaks
const doubleImages = [...REFINED_GALLERY, ...REFINED_GALLERY];

export default function MarqueeGallery() {
  return (
    <div className="relative w-full overflow-hidden py-20 bg-navy-base">
      
      {/* Luxury Edge Fades: These "melt" the images into your navy background */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-80 z-20 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-80 z-20 bg-gradient-to-l from-[#0a1628] via-[#0a1628]/80 to-transparent pointer-events-none" />

      <motion.div 
        className="flex gap-10 w-max"
        animate={{ 
          x: [0, -1600] // Adjust this number based on your card widths
        }}
        transition={{ 
          duration: 50, // Slower duration = more luxury feel
          repeat: Infinity, 
          ease: "linear" 
        }}
        whileHover={{ animationPlayState: "paused" }} // Pauses for the user to admire the work
      >
        {doubleImages.map((item, idx) => (
          <div 
            key={idx} 
            className="relative group w-[320px] h-[450px] md:w-[500px] md:h-[650px] flex-shrink-0"
          >
            {/* The Image Container */}
            <div className="w-full h-full rounded-[4rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 group-hover:rounded-[2.5rem] group-hover:scale-[0.98]">
             
             <img
             src={item.src}
             alt={item.label}
                 className="..."
                onError={(e) => {
             // Stop the loop by removing the broken source entirely
              e.target.style.display = 'none'; 
          }}
               />
              
              {/* Subtle Pink Glow on Hover */}
              <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Minimalist Floating Label - Animates up on hover */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bottom-12 z-30">
              <span className="bg-white text-navy-base px-8 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Background Decorative Text (Optional - Subtle Watermark) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black leading-none">BIGFARRYS</h2>
      </div>
    </div>
  );
}