// import "./App.css";
import { useState, useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import windIC from "./assets/wind.png"
import { BG } from "./BG"
import Calendar from "./Calendar";
import Statistics from "./Statistics";

export const Main = () => {
  const [BGImg, setBGImg] = useState('')
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const [town, settown] = useState("Ярославль");
  const [errortext, seterror] = useState("");
  const [icon, seticon] = useState();
  const [day, setday] = useState(0)
  const [selected, setselected] = useState(null)
  const [time, settime] = useState(null)
  const [date, setdate] = useState(null)

  const inputref = useRef("Yaroslavl");

  const fetchSearch = (url) => {
    if (inputref.current.value == '') {
      return 0
    }
    fetch(url).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return false
      }
    }).then(datao => {
      if (datao != false) {
        setdata(datao)
        console.log(datao);
        setvisible(true)
        console.log('cock');
      }
    }).catch((e) => console.log(e))
  }

  useEffect(() => {
    if (visible) {
      setBGImg(BG(data.list[day].weather[0].main))
      seticon(`https://openweathermap.org/img/wn/${data.list[day].weather[0].icon}@2x.png`)
    }
  }, [data, day, time, town])

  const getMonthName = (MonthNum) => {
    let date = new Date()
    date.setMonth(MonthNum - 1)
    return date.toLocaleString('ru', { month: 'long' })
  }
  const middleNum = (mass)=>{
    let count = 0
    mass.map((e)=>{
      count += 1
    })
    return Math.round(count/2)
  }
  useEffect(() => {
    if (selected !== null) {
      let date = new Date();
      let mass = []
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.substring(8, 10) == Number(selected.id)) {
          mass.push({ num: i, time: data.list[i].dt_txt.substring(11, 13) })
        }
      }
      if (mass[0].num != 0) {
        console.log(middleNum(mass));
        setdate(`${data.list[mass[middleNum(mass)].num].dt_txt.substring(8, 10)} ${getMonthName(data.list[mass[middleNum(mass)].num].dt_txt.substring(5, 7))}`)
        console.log(mass[middleNum(mass)].num);
        setday(mass[middleNum(mass)].num)
        settime(`${mass[middleNum(mass)].time}:00`)
      } else {
        setday(`${date.getDate()}`)
        setdate(`${date.getDate()} ${getMonthName(date.getMonth()+1)}`)
        settime(`${date.getHours()}:${date.getMinutes()}`)
      }
    }
  }, [selected])

  useEffect(() => {
    fetchSearch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`);
  }, []);

  if (visible) {
    return (
      <div className="App">
        <div className="case_1">
          <div className="search">
            <input
              className="searching"
              ref={inputref}
              type="search"
              placeholder="Yaroslavl"
            />
            <button className="searchbutton"
              onClick={() => {
                settown(inputref.current.value);
                fetchSearch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputref.current.value}&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb`);
              }}
              
            >search</button>
          </div>
          <div style={{ width: '100%' }} className="helpjer" onClick={(e) => {
            if (e.target.className === "dates" || e.target.parentNode.className === 'dates') {
              if (e.target.parentNode.className === 'dates') {
                setselected(e.target.parentNode)
              } else {
                setselected(e.target)
              }
            }
          }}>
            <Calendar dates={data.list} />
          </div>
        </div>
        <div className="Main">
          <div className="Weather" style={{backgroundImage: `url(${BGImg})`}}>
            <div className="case_2">
              <div>{errortext}</div>
              <img className="icon" src={icon}></img>
              <div className="temp">{Math.round(data.list[day].main.temp)}°C</div>
            </div>
            <div className="case_3">
              <div>{date}</div>
              <div>{time}</div>
              <div className="feels_like">
                По ощущениям {Math.round(data.list[day].main.feels_like)}°C
              </div>
            </div>
          </div>
          <div className="Main2">
          <Statistics dates={data.list} day={day} />
        <YMaps>
              <div className="map">
                <Map
                  height={400}
                  state={{
                    center: [data.city.coord.lat, data.city.coord.lon],
                    zoom: 11,
                  }}
                />
              </div>
            </YMaps>
          </div>
        </div>
      </div>
)
  }else{
    return <div style={{ pading: "auto" }}>Loading...</div>;
  }

}

