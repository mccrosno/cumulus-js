import { useEffect, useState } from "react";

const DetailedForecast = ({
    daySelected,
}:{
    daySelected : number | null;
}) => {

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (daySelected !== null)
        {
            // timer for animation, set loaded true
        }
        else
        {
            setLoaded(false);
        }
    }, [daySelected]);

    return (
        <div className={`
              
        `}/>
    );
};

export default DetailedForecast;