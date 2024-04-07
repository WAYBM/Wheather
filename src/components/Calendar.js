import { useState, useEffect, useRef } from "react";
import { BG } from "./BG"
export default function Calendar({dates}) {
    const calref = useRef('')
    const select = (e)=>{
        let dates = document.querySelectorAll('.dates')
        if (e.className != 'Calendar') {
            for (let i = 0; i < dates.length; i++) {
                dates[i].style.border = ' 1px solid grey'
                
            }
            if (e.parentNode.className == 'dates') {
                e.parentNode.style.border = ' 1px solid lime'
            }else{
                e.style.border = ' 1px solid lime'
            }
        }
    }
    const getMonthName = (MonthNum) =>{
        let date = new Date()
        date.setMonth(MonthNum - 1)
        return date.toLocaleString('ru', {month:'long'})
    }
    useEffect(()=>{
        let date = new Date();
        let cal = document.getElementsByClassName('.Calendar')
        let mass = []
        let mass2 = []
        let mass3 = []
        calref.current.innerHTML = 0
        if (document.querySelectorAll('.dates').length<1) {
            for (let i = 0; i < dates.length; i++) {
                if (mass2[mass2.length-1]!=dates[i].dt_txt.substring(8,10)&&Number(dates[i].dt_txt.substring(11,13))===12) {
                    mass2.push(dates[i].dt_txt.substring(8,10))
                    const key = i
                    const value = dates[i]
                    mass.push(dates[i].dt_txt.substring(5,7))
                    mass3.push(dates[i])  
                }
            }
            console.log(mass3);
            for (let i = 0; i < mass2.length; i++) {
                console.log(mass3[i].weather[0].main);
                calref.current.insertAdjacentHTML('beforeEnd', `<div class="dates" style="${`background-image: url(${BG(mass3[i].weather[0].main)})`}" id=${mass2[i]}>
                <p>${mass2[i]}</p>
                <img class="specicon" src='${`https://openweathermap.org/img/wn/${mass3[i].weather[0].icon}@2x.png`}'/>
                <p>${getMonthName(mass[i])}</p>
                </div>` )
            }
        }
        console.log(date.getMonth());
    },[dates])
    return (
        <div ref={calref} className="Calendar" onClick={(e)=>{
            select(e.target)
        }}>

        </div>
    )
}