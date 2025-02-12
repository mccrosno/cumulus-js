const WeatherDisplayContainer = ({
    children,
}:{
    children?: React.ReactNode;
}) => {
  return (
    <div className="flex bg-white w-full h-full">
      <p className="text-center">Weather Display</p>
    </div>
  );
}

export default WeatherDisplayContainer;