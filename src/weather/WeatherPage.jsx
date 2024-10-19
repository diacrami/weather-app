/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from './hooks/useForm'

import { Error } from './components/Error'
import { WeatherInformation } from './components/WeatherInformation'

import { WeatherOptions } from './components/WeatherOptions'
import { Search } from './components/Search'

import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

import clear_video from '../assets/videos/clear.mp4'
import cloud_video from '../assets/videos/cloud.mp4'
import drizzle_video from '../assets/videos/drizzle.mp4'
import rain_video from '../assets/videos/rain.mp4'
import snow_video from '../assets/videos/snow.mp4'


export const WeatherPage = () => {

    const [weatherData, setWeatherData] = useState({});
    const [options_list, setOptions_list] = useState([]);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef();

    const { formState, search_value, onInputChange, onResetForm } = useForm({
        search_value: "",
    })

    const [video_bg, setVideo_bg] = useState();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const allVideos = {
        "01d": clear_video,
        "01n": clear_video,
        "02d": cloud_video,
        "02n": cloud_video,
        "03d": cloud_video,
        "03n": cloud_video,
        "04d": drizzle_video,
        "04n": drizzle_video,
        "09d": rain_video,
        "09n": rain_video,
        "10d": rain_video,
        "10n": rain_video,
        "13d": snow_video,
        "13n": snow_video,
    }
    useEffect(() => {
        search("Guayaquil")
    }, [])

    useEffect(() => {
        videoRef.current?.load();
    }, [weatherData])
    


    useEffect(() => {
        const getData = setTimeout(() => {
            options(search_value);
        }, 1500);

        return () => {
            clearTimeout(getData)
        }
    }, [search_value])



    const options = async (search_name) => {
        setLoading(true)

        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {
                namePrefix: search_name,
                minPopulation: 1000, //000
                languageCode: 'es',
                limit: '10',
            },
            headers: {
                'x-rapidapi-key': '77e145d9bemsh8c124add0befbe7p1b1b68jsnde4ef64701ef',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            let optionsInclude = response.data.data.filter((city) => !(city.city.includes("Ciudad")) && !(city.city.includes("Distrito")) && !(city.city.includes("Cantón")) && !(city.city.includes("Parroquia")) && !(city.city.includes("Departamento")))
            setOptions_list(optionsInclude)
            setLoading(false)
        } catch (error) {
            setOptions_list();
            setWeatherData({ error: `Error: Ciudad no encontrada` })
        }
    }



    const eliminarDiacriticosEs = (texto) => {
        return texto
            .normalize('NFD')
            // eslint-disable-next-line no-misleading-character-class
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize();
    }

    const search = async (city_name) => {
        if (city_name) {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${eliminarDiacriticosEs(city_name)}&units=metric&lang=es&appid=${import.meta.env.VITE_APP_ID}`;
                const weatherAPI = axios.create(
                    {
                        baseURL: url
                    }
                )
                const weather = await weatherAPI.get("")
                const icon = allIcons[weather.data.weather[0].icon] || clear_icon;                
                const video_bg = allVideos[weather.data.weather[0].icon] || clear_video;

                setWeatherData({
                    humidity: weather.data.main.humidity,
                    windSpeed: weather.data.wind.speed,
                    temperature: Math.floor(weather.data.main.temp),
                    city: weather.data.name,
                    country: weather.data.sys.country,
                    icon: icon,
                    video_bg: video_bg,
                })
                //onResetForm();

            } catch (error) {
                setWeatherData({ error: `Error: Ciudad no encontrada` })
            }
        } else {
            setWeatherData({ error: "Ingrese el nombre de una ciudad" })
            return;
        }
    }

    const handleOption = (opt) => {
        //search(`${opt.city}`);
        search(`${opt}`);
        setOptions_list();
    }


    return (

        <div className='min-h-[100vh] grid'>
            <video 
                autoPlay
                loop
                muted
                className="absolute z-10 w-full h-full object-cover"
                ref={videoRef}
            >
                <source
                    src={weatherData.video_bg}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div className="z-20 absolute w-auto min-w-full min-h-full max-w-none opacity-50 bg-slate-500">

            </div>
            <div className='z-30 h-fit min-h-[470px] pt-10 pb-10 pl-5 pr-5 font-poppins place-self-center flex flex-col gap-8 bg-cyan-600 rounded-md'>
                <div className='relative flex flex-col gap-0'>

                    <Search
                        onInputChange={onInputChange}
                        search_value={search_value}
                        handleOption={handleOption}
                    />
                    <WeatherOptions
                        options_list={options_list}
                        loading={loading}
                        handleOption={handleOption}
                    />
                </div>
                {
                    weatherData.temperature ?

                        <WeatherInformation
                            weatherData={weatherData}
                            setOptions_list={setOptions_list}
                        />

                        :

                        <></>
                }
                {
                    !options_list && weatherData.error && <Error message={weatherData.error} />
                }
            </div >
        </div>
    )
}
