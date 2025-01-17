const CitySearch = ({
    city,
    setCity,
    getWeather,
  }: {
    city: string;
    setCity: (city: string) => void;
    getWeather: () => void;
  }) => {
    return (
        <div className='flex'>
            <input
                className="border px-4 py-2 rounded-l-xl text-black"
                name='citySearch'
                type='text'
                value={city}
                placeholder='Enter your city...'
                onChange={event => setCity(event.target.value)} // when input is changed, sets city to contents of html element
            />
            <button
            className="transition-colors bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
            onClick={getWeather}
            >
                Submit
            </button>
        </div>
    );
  };
  
  export default CitySearch;