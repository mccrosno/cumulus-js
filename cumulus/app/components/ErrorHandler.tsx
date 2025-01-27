const ErrorHandler = ({
    error,
}: {
    error: string | null;
}) => {
    return (
        <div className={`absolute bg-rose-700 p-3 rounded-2xl transition-[bottom] duration-1000 ${error ? 'bottom-[10%]' : 'bottom-[-10%]'}`}>
            { error &&
                <div>
                <p className="text-white"> {error} </p>
                </div>
            }
        </div>
    );
}

export default ErrorHandler;