const CitySearch = ({
    city,
    setCity,
    getWeather,
    loaded,
  }: {
    city: string;
    setCity: (city: string) => void;
    getWeather: () => void;
    loaded: boolean;
  }) => {
    // Handles key presses
    const handleKeyPressed = (key: string) => {
        if (key === 'Enter') // if enter key is pressed
        {
          getWeather(); // get weather data
        }
    };


    return (
        <div className={`absolute transition-[bottom] duration-1000 ${loaded ? 'bottom-[20%]' : 'bottom-[50%] z-[1]'}`}>
            <input
                className={`px-4 py-2 rounded-l-xl placeholder-gray-600 text-black`}
                name='citySearch'
                type='text'
                value={city}
                placeholder='Enter your city...'
                onChange={event => setCity(event.target.value)} // when input is changed, sets city to contents of html element
                onKeyDown={event => handleKeyPressed(event.key)} // handle keypresses
            />
            <button
            className={`transition-colors bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600`}
            onClick={getWeather}
            >
                Submit
            </button>
        </div>
    );
  };
  
  export default CitySearch;