import "./App.css";
import { useEffect, useState } from "react";
import Onboarding from "./component/Onboarding";
import Content from "./component/Content";

function App() {
  const [quote, setQuote] = useState("");
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState("delhi");
  const user = useState(localStorage.getItem("user"));
  const api_key = process.env.REACT_APP_WEATHER_API;
  const api_url = "https://stoicquotesapi.com/v1/api/quotes/random";
  const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

  const getQuote = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setQuote(data.body);
  };

  const getWeather = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  const getlocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation(`${latitude},${longitude}`);
    })
  }
  useEffect(() => {
    getQuote(api_url);
  }, []);

  useEffect(() => {
    getlocation();
    getWeather(weatherURL);
  }, [weatherURL]);

  return (
    <div className="text-white flex flex-col h-screen w-screen bg-gray-400 bg-blend-multiply bg-[url('https://source.unsplash.com/random/1920x1080?landscape')] bg-cover">
      <div className="p-4 w-full gap-2 flex justify-end">
        <div>
          {weather ? (
            <div>
              <img className="h-12 w-12" src={`https:${weather.current.condition.icon}`} alt="" />
              <div className="flex flex-col">
                <h1>
                  <span className="font-bold">{weather.current.temp_c}</span>&deg;C
                </h1>
                <h1><span className="font-bold capitalize">{weather.location.name}</span>
                </h1>
              </div>
            </div>
          ) : (
            <div>hello</div>
          )}
        </div>
      </div>

      <div className=" bg-blend-multiply h-screen w-screen">
        <div className="flex flex-col gap-5 text-center items-center justify-center">
          {user[0] !== null ? <Content /> : <Onboarding />}
        </div>
      </div>
      <div className="text-center pb-2">
        <p className="font-bold font-serif max-w-2xl mx-auto">{quote}</p>
      </div>
    </div>
  );
}

export default App;
