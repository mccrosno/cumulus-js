const glassmorphic = () => {
   return `
    bg-[rgba(255,255,255,0.2)]
    backdrop-blur-[3px]
    shadow-[rgba(40,40,150,0.35)_8px_8px_32px_0px]
    bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0)]
    z-[1]
   `.trim()    
};

export default glassmorphic;