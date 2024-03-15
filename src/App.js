import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false)
  const fetchfunc = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=yaroslavl&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.list[0]);
        setdata(data);
        setvisible(true)
      });
  };
  useEffect(() => {
    fetchfunc();
    const interv = setTimeout(fetchfunc, 10000);
    return () => {
      clearTimeout(interv);
    };
  }, []);
  if (visible) {
    return (
      <div className="App">
        <div className="Weather">
          <div className="temp">Температура: {Math.round(data.list[0].main.temp)}</div>
          <div className="feels_like">Ощущается как: {Math.round(data.list[0].main.feels_like)}</div>
          <div className="maxtemp">Максимальная температура: {Math.round(data.list[0].main.temp_max)}</div>
          <div className="mintemp">Минимальная температура: {Math.round(data.list[0].main.temp_min)}</div>
        </div>
        <div></div>
      </div>
    );
  }else{
    return(
      <div style={{margin:'auto'}}>Loading...</div>
    );
  }
}

export default App;
