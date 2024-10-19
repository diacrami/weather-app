
import PropTypes from 'prop-types';

import wind_icon from '/assets/wind.png'
import humidity_icon from '/assets/humidity.png'

export const WeatherInformation = ({weatherData, setOptions_list}) => {
    return (
        <>
            <div className='flex flex-col gap-5 items-center text-slate-200' onClick={() => setOptions_list() }>
                <img className='w-28 h-28' src={weatherData.icon} alt="" />
                <div className='flex flex-col items-center'>
                    <p className='font-semibold text-6xl'>{weatherData.temperature}</p>
                    <p className='font-medium text-3xl'>{weatherData.city}</p>
                    <p className='font-light text-xl'>{weatherData.country}</p>
                </div>
            </div>
            <div className='flex flex-row justify-between text-slate-200'>
                <div className='flex flex-row gap-3 items-center'>
                    <img className='w-6 h-6' src={humidity_icon} alt="" />
                    <div className='flex flex-col items-center'>
                        <p className='font-semibold text-base'>{weatherData.humidity}</p>
                        <span className='font-medium text-sm'>Humidity</span>
                    </div>
                </div>
                <div className='flex flex-row gap-3 items-center'>
                    <img className='w-6 h-6' src={wind_icon} alt="" />
                    <div className='flex flex-col items-center'>
                        <p className='font-semibold text-base'>{weatherData.windSpeed}/h</p>
                        <span className='font-medium text-sm'>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>
    )
}


WeatherInformation.propTypes = {
    weatherData: PropTypes.object,
    setOptions_list: PropTypes.func,
};