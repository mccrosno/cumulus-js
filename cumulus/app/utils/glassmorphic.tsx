const glassmorphic = ({
    customBGColor,
    customBlurAmt,
    customShadow,
    customGradientDirection,
    customGradientStartColor,
    customGradientEndColor,
    customZIndex,
}:{
    customBGColor?: boolean,
    customBlurAmt?: boolean,
    customShadow?: boolean,
    customGradientDirection?: boolean,
    customGradientStartColor?: boolean,
    customGradientEndColor?: boolean,
    customZIndex?: boolean,
} = {}) => {
   return `
   ${customBGColor ? "" : "bg-[rgba(255,255,255,0.2)]"}
   ${customBlurAmt ? "" : "backdrop-blur-[25px]"}
   ${(customShadow) ? "" : "shadow-[rgba(40,40,150,0.35)_0px_8px_32px_0px]"}
   ${customGradientDirection ? "" : "bg-gradient-to-br"}
   ${customGradientStartColor ? "" : "from-[rgba(255,255,255,0.2)]"}
   ${customGradientEndColor ? "" : "to-[rgba(255,255,255,0)]"}
   ${customZIndex ? "" : "z-[1]"}
   `.trim()    
};

export default glassmorphic;