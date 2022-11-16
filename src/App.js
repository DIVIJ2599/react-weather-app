import Search from "./Components/Search";
import './App.css'
import CurrentWeather from "./Components/CurrentWeather";
import {WEATHER_API_KEY, WEATHER_API_URL} from './api.js'
import { useState } from "react";
import Forecast from "./Components/Forecast";

function App() {
  
  const [weather,setWeather] = useState(null);
  const [forecast,setForecast] = useState(null);

  const handleSearchChange = (searchData) =>{
    const [lat,lon] = searchData.value.split(" ");

    const weatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([weatherFetch,forecastFetch])
    .then(async (res)=>{
      const weatherRes = await res[0].json();
      const forecastRes = await res[1].json();

      setWeather({ city: searchData.label, ...weatherRes});
      setForecast({city: searchData.label, ...forecastRes});
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      { weather ? 
      <CurrentWeather data={weather}/>
      : null
      }
      { forecast ?
      <Forecast data = {forecast}/> : null
      }
    </div>
  );
}

export default App;
