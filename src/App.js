import "./App.css";
import { useState, useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

function App() {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const [town, settown] = useState("yaroslavl");
  const [errortext, seterror] = useState("");
  const [icon, seticon] = useState();
  const [url, seturl] = useState(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`)
  const inputref = useRef("Yaroslavl");
  const refmap = useRef(null);
  const search = async (typeofsearch) => {
    if (inputref.current.value === "") {
      return 0;
    }
    if (typeofsearch === 'input') {
      seturl(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`)
    }
    if (typeofsearch === "map") {
      seturl(`https://api.openweathermap.org/data/2.5/forecast?lat=${refmap.current._sourceEvent.originalEvent.coords[0]}&lon=${refmap.current._sourceEvent.originalEvent.coords[1]}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`)
    }
    settown(inputref.current.value);
    let response = await fetch(url);
    let datao = await response.json();
    if (response.ok) {
      setvisible(true);
      setdata(datao);
      seterror("");
    } else {
      seterror("Not Found 404");
    }
  };
  useEffect(() => {
    search();
  }, []);
  if (visible) {
    return (
      <div className="App">
        <YMaps>
          <div ref={refmap}>
            <Map 
              onClick={(e) => {
                console.log(e._sourceEvent.originalEvent.coords);
              }}
              state={{
                center: [data.city.coord.lat, data.city.coord.lon],
                zoom: 11,
              }}
            />
          </div>
        </YMaps>
        <div className="Weather">
          <div>
            <input
              className="searching"
              ref={inputref}
              type="search"
              placeholder="Yaroslavl"
            />
            <button
              onClick={() => {
                search('input');
              }}
            >
              SEARCH
            </button>
            <button
              className="search_map"
              onClick={()=>{
                console.log(refmap.current.firstChild.firstChild.center);
                // search("map");
              }}
            >
              SEARCH MAP
            </button>
          </div>
          <div>{errortext}</div>
          {/* <button onClick={fetchmap()}>MAP</button> */}
          <div className="temp">
            Температура: {Math.round(data.list[0].main.temp)}°C
          </div>
          <div className="feels_like">
            Ощущается как: {Math.round(data.list[0].main.feels_like)}°C
          </div>
          <div className="maxtemp">
            Максимальная температура: {Math.round(data.list[0].main.temp_max)}°C
          </div>
          <div className="mintemp">
            Минимальная температура: {Math.round(data.list[0].main.temp_min)}°C
          </div>
          <img className="icon" src={icon}></img>
        </div>
      </div>
    );
  } else {
    return <div style={{ margin: "auto" }}>Loading...</div>;
  }
}

export default App;
