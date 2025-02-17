const getIcon = (iconCode: string) => {

    // Switch statement to compare OpenWeatherMap icons to Cumulus icons
    switch (iconCode) {
        // Clear sky (Day)
        case "01d":
            return "sun.svg";

        // Clear sky (Night)
        case "01n":
            return "moon.svg";

        // Cloudy
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
            return "cloudy.svg";

        // Rainy
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return "rainy.svg";

        // Thunderstorm
        case "11d":
        case "11n":
            return "thunderstorm.svg";

        // Snow
        case "13d":
        case "13n":
            return "snow.svg";

        // Foggy
        case "50d":
        case "50n":
            return "fog.svg";

        // Unknown
        default:
            return null;
    };
};

export default getIcon;