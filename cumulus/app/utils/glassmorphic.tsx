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
   ${(customShadow) ? "" : "shadow-[rgba(0,0,0,0.2)_4px_4px_30px_0px]"}
   ${customGradientDirection ? "" : "bg-gradient-to-br"}
   ${customGradientStartColor ? "" : "from-[rgba(255,255,255,0.2)]"}
   ${customGradientEndColor ? "" : "to-[rgba(255,255,255,0)]"}
   ${customZIndex ? "" : "z-[2]"}
   `.trim()    
};

export default glassmorphic;