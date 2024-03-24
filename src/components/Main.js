// import "./App.css";
import { useState, useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import windIC from "./assets/wind.png"
import { BG } from "./BG"
import Calendar from "./Calendar";

export const Main = () => {
  const [BGImg, setBGImg] = useState('')
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const [town, settown] = useState("Ярославль");
  const [errortext, seterror] = useState("");
  const [icon, seticon] = useState();
  const inputref = useRef("Yaroslavl");
  const fetchSearch = (url) => {
    if (inputref.current.value == '') {
      return 0
    }
    console.log(inputref.current.value);
    setBGImg('https://wallpaper.dog/large/20509187.jpg')
    fetch(url).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return false
      }
    }).then(datao => {
      if (datao != false) {
        setBGImg(BG(datao.list[0].weather[0].main))
        seticon(
          `https://openweathermap.org/img/wn/${datao.list[0].weather[0].icon}@2x.png`
        );
        setdata(datao)
        console.log(datao);
        setvisible(true)
      }
    }).catch((e) => console.log(e))
  }
  useEffect(() => {
    fetchSearch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`);
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
                settown(inputref.current.value);
                fetchSearch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputref.current.value}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`);
              }}
            >
              SEARCH
            </button>
          </div>
          <div className="case_2">
            <div>{errortext}</div>
            <img className="icon" src={icon}></img>
            <div className="temp">{Math.round(data.list[0].main.temp)}°C</div>
          </div>
          <div className="case_3">
            <div className="feels_like">
              По ощущению {Math.round(data.list[0].main.feels_like)}°C
            </div>
            <div className="wind">
              <p>
                Ветер {Math.round(data.list[0].wind.speed)} м/с
              </p>
              <img src={windIC} className="windIMG"></img>
            </div>
          </div>
        </div>
        <Calendar dates={data.list} />
      </div>
    );
  } else {
    return <div style={{ pading: "auto" }}>Loading...</div>;
  }
};
