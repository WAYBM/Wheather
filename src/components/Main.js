// import "./App.css";
import { useState, useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

export const Main = () => {
  const [BGImg, setBGImg] = useState('')
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const [town, settown] = useState("yaroslavl");
  const [errortext, seterror] = useState("");
  const [icon, seticon] = useState();
  const [url, seturl] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`
  );
  const inputref = useRef("Yaroslavl");
  const refmap = useRef(null);
  const search = async (typeofsearch) => {
    if (inputref.current.value === "") {
      return 0;
    }
    if (typeofsearch === "input") {
      seturl(
        `https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`
      );
    }
    if (typeofsearch === "map") {
      seturl(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${refmap.current._sourceEvent.originalEvent.coords[0]}&lon=${refmap.current._sourceEvent.originalEvent.coords[1]}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`
      );
    }
    settown(inputref.current.value);
    let response = await fetch(url);
    let datao = await response.json();
    if (response.ok) {
      setvisible(true);
      setdata(datao);
      console.log(datao);
      seterror("");
      if (datao.list[0].weather[0].main == 'Clouds'){
        setBGImg('https://wallpaper.dog/large/20509187.jpg')
      }
      if (datao.list[0].weather[0].main == 'Rain') {
        setBGImg('https://catherineasquithgallery.com/uploads/posts/2023-01/1674324108_catherineasquithgallery-com-p-fon-serie-oblaka-foto-192.jpg')
      }
      seticon(
        `https://openweathermap.org/img/wn/${datao.list[0].weather[0].icon}@2x.png`
      );
    } else {
      seterror("Not Found 404");
    }
  };
  useEffect(() => {
    search("input");
  }, []);
  if (visible) {
    return (
      <div className="App">
        <YMaps>
          <div>
            <Map
              state={{
                center: [data.city.coord.lat, data.city.coord.lon],
                zoom: 11,
              }}
            />
          </div>
        </YMaps>
        <div className="Weather">
          <div className="case_BG" style={{ backgroundImage: `url(${BGImg})` }}></div>
          <div className="case_1">
            <input
              className="searching"
              ref={inputref}
              type="search"
              placeholder="Yaroslavl"
            />
            <button
              onClick={() => {
                search("input");
              }}
            >
              SEARCH
            </button>
            {/* <button
              className="search_map"
              onClick={()=>{
                console.log(refmap.current.firstChild.firstChild);
                // search("map");
              }}
            >
              SEARCH MAP
            </button> */}
          </div>
          <div className="case_2">
            <div>{errortext}</div>
            <img className="icon" src={icon}></img>
            {/* <button onClick={fetchmap()}>MAP</button> */}
            <div className="temp">{Math.round(data.list[0].main.temp)}°C</div>
          </div>
          <div className="case_3">
            <div className="feels_like">
              По ощущению {Math.round(data.list[0].main.feels_like)}°C
            </div>
            {/* <div className="maxtemp">
            Максимальная {Math.round(data.list[0].main.temp_max)}°C
          </div>
          <div className="mintemp">
            Минимальная {Math.round(data.list[0].main.temp_min)}°C
          </div> */}
          </div>
        </div>
      </div>
    );
  } else {
    return <div style={{ margin: "auto" }}>Loading...</div>;
  }
};
