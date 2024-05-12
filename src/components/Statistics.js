import { useState, useEffect, useRef, createElement } from "react";
import { BG } from "./BG"

export default function Statistics({ day, dates }) {
  const calref = useRef('')
  const massEl = useRef([])
  useEffect(() => {
    calref.current.innerHTML = ''
    massEl.current = []
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].dt_txt.substring(8, 10) == dates[day].dt_txt.substring(8, 10)) {
        calref.current.insertAdjacentHTML('beforeend', `<div class = 'stats'>
              <p>${Math.round(dates[i].main.temp)}°C</p>
              <img src='https://openweathermap.org/img/wn/${dates[i].weather[0].icon}@2x.png'></img>
                <p>${dates[i].dt_txt.substring(11, 16)}</p>
                <p>${dates[i].wind.speed} м/c</p>
            </div>`)
        console.log(dates[i]);
        massEl.current.push(dates[i])
      }
    }
    console.log(massEl.current);
  }, [dates, day])
  return (
    <div className="Statistics" ref={calref}>


    </div>
  )
}