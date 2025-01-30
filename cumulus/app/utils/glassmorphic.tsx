const glassmorphic = ({
    customBGColor,
    customBlurAmt,
    customShadowColor,
    customShadowSpread,
    customGradientStartColor,
    customGradientEndColor,
    customZIndex,
}:{
    customBGColor?: boolean,
    customBlurAmt?: boolean,
    customShadowColor?: boolean,
    customShadowSpread?: boolean,
    customGradientStartColor?: boolean,
    customGradientEndColor?: boolean,
    customZIndex?: boolean,
} = {}) => {
   return `
    ${customBGColor ? "" : "bg-[rgba(255,255,255,0.2)]"}
    ${customBlurAmt ? "" : "backdrop-blur-[3px]"}
    ${customShadowColor ? "" : "shadow-[rgba(40,40,150,0.35)]"}
    ${customShadowSpread ? "" : "shadow-[10px]"}
    bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0)]
    z-[1]
   `.trim()    
};

export default glassmorphic;