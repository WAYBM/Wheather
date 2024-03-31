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
  const [day, setday] = useState(0)
  const [time, settime] = useState(null)
  const inputref = useRef("Yaroslavl");
  const setting_day = (e) => {
    let date = new Date();
    let mass = []
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.substring(8, 10) == Number(e.id)) {
        mass.push({ num: i, time: data.list[i].dt_txt.substring(11, 13) })
      }
    }
    if (mass[0].num != 0) {
      setday(mass[4].num)
      settime(`${mass[4].time}:00`)
    } else {
      setday(0)
      settime(`${date.getHours()}:${date.getMinutes()}`)
    }
    setBGImg(BG(data.list[day].weather[0].main))
    seticon(`https://openweathermap.org/img/wn/${data.list[day].weather[0].icon}@2x.png`) 
    console.log(mass);
  }
  const fetchSearch = (url) => {
    if (inputref.current.value == '') {
      return 0
    }
    setBGImg('https://wallpaper.dog/large/20509187.jpg')
    fetch(url).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return false
      }
    }).then(datao => {
      if (datao != false) {
        setBGImg(BG(datao.list[day].weather[0].main))
        seticon(
          `https://openweathermap.org/img/wn/${datao.list[day].weather[0].icon}@2x.png`
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
  // useEffect(()=>{
  //   if (data.list[day].weather[0].main == undefined) {
  //     console.log('cock');
  //     return 0
  //   }else{
  //     setBGImg(BG(data.list[day].weather[0].main))
  //     seticon(`https://openweathermap.org/img/wn/${data.list[day].weather[0].icon}@2x.png`) 
  //   }
  // },[day])
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
            <div className="temp">{Math.round(data.list[day].main.temp)}°C</div>
          </div>
          <div className="case_3">
            <div>{time}</div>
            <div className="feels_like">
              По ощущению {Math.round(data.list[day].main.feels_like)}°C
            </div>
            <div className="wind">
              <p>
                Ветер {Math.round(data.list[day].wind.speed)} м/с
              </p>
              <img src={windIC} className="windIMG"></img>
            </div>
          </div>
        </div>
        <div style={{ width: '70%' }} className="helpjer" onClick={(e) => {
          if (e.target.className === "dates" || e.target.parentNode.className === 'dates') {
            if (e.target.parentNode.className === 'dates') {
              setting_day(e.target.parentNode)
            } else {
              setting_day(e.target)
            }
          }
        }}>
          <Calendar dates={data.list} />
        </div>
      </div>
    );
  } else {
    return <div style={{ pading: "auto" }}>Loading...</div>;
  }
};
