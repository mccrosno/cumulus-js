const TempBar = ({
    width,
    offset,
}:{
    width : number;
    offset : number;
}) => {
    return (
        <div className="relative w-16 h-1.5 rounded-full bg-[rgba(0,0,0,0.2)]">
            <div
                className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-200 to-orange-200"
                style={{ 
                    width: `${width}%`,
                    left: `${offset}%`,
                }}
            />
        </div>
    );
};

export default TempBar;