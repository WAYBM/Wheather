import { useState, useEffect, useRef, createElement } from "react";
import { BG } from "./BG"
import "./Wind.css";

export default function Wind({day,dates}){
    const WindTurn=(deg)=>{
        if (deg<=90) {
            if (deg<=10) {
                return 'Северный'
            }
            return 'Северо-Восточный'
        }
        if (deg>90) {
            if (deg<=100) {
                return 'Восточный'
            }
            return 'Юго-Восточный'
        }
        if (deg>=180 && deg<270) {
            if (deg<=190) {
                return 'Южный'
            }
            return 'Юго-Западный'
        }
        if (deg>270) {
            if (deg<=280) {
                return 'Западный'
            }
            return 'Северо-Западный'
        }
    }
    const calref = useRef(null)
    useEffect(()=>{
        calref.current.innerHTML = ''
        for (let i = 0; i < dates.length; i++) {
            if (dates[i].dt_txt.substring(8, 10) == dates[day].dt_txt.substring(8, 10)) {
                let div = document.createElement('div')
                div.innerHTML =  dates[i].wind.speed + ' м/c'
                let div_vector = document.createElement('div')
                div_vector.className = 'windVector'
                div_vector.innerHTML = WindTurn(dates[i].wind.deg)
                calref.current.append(div)
                calref.current.append(div_vector)
            }
        }
    },[day,dates])
    return (
        <div className="podWind">
            <div className="Wind" ref={calref}></div>
        </div>
    )

} 