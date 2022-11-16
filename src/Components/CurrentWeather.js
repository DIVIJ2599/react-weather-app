import './CurrentWeather.css';

const CurrentWeather = ({data}) =>{
    return (
    <div className='weather'>
        <div className='top'>
            <div>
            <p className='city'>{data.city}</p>
            <p className='weather__description'>{data.weather[0].description}</p>
            </div>
        <img alt='weather' className='weather__icon' src={`icons/${data.weather[0].icon}.png`}></img>
        </div>
        <div className='bottom'>
            <p className='temprature'>{Math.round(data.main.temp)}°C</p>
            <div className='details'>
                <div className='row'>
                    <span className='label'>Feels Like</span>
                    <span className='value'>{Math.round(data.main.feels_like)}°C</span>
                </div>
                <div className='row'>
                    <span className='label'>Wind</span>
                    <span className='value'>{data.wind.speed}Km/H</span>
                </div>
                <div className='row'>
                    <span className='label'>Humidity</span>
                    <span className='value'>{data.main.humidity}%</span>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default CurrentWeather;