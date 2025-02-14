const WeatherDisplayContainer = ({
    children,
}:{
    children?: React.ReactNode;
}) => {
  return (
    <div className="flex-1 bg-white text-black">
      <p className="text-center">Weather Display</p>
    </div>
  );
}

export default WeatherDisplayContainer;