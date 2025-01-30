const glassmorphic = ({
    constantBGColor,
    blurAmt,
    shadowColor,
    shadowSpread,
    gradientStartColor,
    gradientEndColor,
    zIndex,
}:{
    constantBGColor?: string;
    blurAmt?: string;
    shadowColor?: string;
    shadowSpread?: string;
    gradientStartColor?: string;
    gradientEndColor?: string;
    zIndex?: number;
} = {}) => {
    return `
        ${constantBGColor ? `bg-[rgba(${constantBGColor})]` : `bg-[rgba(255,255,255,0.2)]`}
        ${blurAmt ? `backdrop-blur-[${blurAmt}]` : `backdrop-blur-[3px]`}
        ${shadowColor ? `shadow-[rgba(${shadowColor})` : `shadow-[rgba(40,40,150,0.35)`}${shadowSpread ? `_${shadowSpread}]` : `_8px_8px_32px_0]`}
        ${gradientStartColor ? `bg-gradient-to-br from-[rgba(${gradientStartColor})]` : `bg-gradient-to-br from-[rgba(200,200,200,0.2)]`}
        ${gradientEndColor ? `to-[rgba(${gradientEndColor})]` : `to-[rgba(255,255,255,0)]`}
        ${zIndex ? `z-[${zIndex}]` : `z-[1]`}
        `.trim();
};

export default glassmorphic;