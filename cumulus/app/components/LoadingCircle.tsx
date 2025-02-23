import '../styles/loadingAnim.css';

const LoadingCircle = ({
    weatherAPICalled,
    loaded,
    hasError,
}:{
    weatherAPICalled : boolean;
    loaded : boolean;
    hasError : boolean
}) => {
    return (
        <div className={`
            w-8 h-8 bg-transparent rounded-full border-4
            border-[rgba(255,255,255,0.2)] border-t-white
            absolute transition-[opacity, top] delay-200 duration-500 loading
            ${(weatherAPICalled && !loaded && !hasError) ? "top-[40%] opacity-100" : "top-[45%] opacity-0"}
        `} />
    );
};

export default LoadingCircle;