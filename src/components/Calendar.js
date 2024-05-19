import { useState, useEffect, useRef, createElement } from "react";
import { BG } from "./BG"
export default function Calendar({ dates }) {
    const calref = useRef('')
    const massNum = useRef([])
    const massDate = useRef([])
    const changeinfo = (e) => {
        const inf0 = document.querySelectorAll('.info')
        for (let i = 0; i < inf0.length; i++) {
            inf0[i].innerHTML = null

        }
        e.insertAdjacentHTML('beforeend', `
        <div class = 'info'>
            ${Math.round(dates[massNum.current[massDate.current.indexOf(e.id)]].main.temp)}°C
        </div>`)
    }
    const select = (e) => {
        let dates = document.querySelectorAll('.dates')
        if (e.className != 'Calendar') {
            for (let i = 0; i < dates.length; i++) {
                dates[i].style.border = ' 1px solid grey'
                dates[i].style.width = '20%'

            }
            if (e.parentNode.className == 'dates') {
                e.parentNode.style.border = ' 1px solid black'
                e.parentNode.style.width = '30%'
                changeinfo(e.parentNode)
            } else {
                e.style.width = '30%'
                e.style.border = ' 1px solid black'
                changeinfo(e)
            }
        }
    }
    const getMonthName = (MonthNum) => {
        let date = new Date()
        date.setMonth(MonthNum - 1)
        return date.toLocaleString('ru', { month: 'long' })
    }
     const MaxTemperatureOfTheDay = (day) =>{
        let max = 0
        for (let i = 0; i < dates.length; i++) {
            if (dates[i].dt_txt.substring(8,10)==day) {
                if (max<dates[i].main.temp) {
                    max = Math.round(dates[i].main.temp)
                }
            }
            
        }
        return max
     }
    useEffect(() => {
        let date = new Date();
        let cal = document.getElementsByClassName('.Calendar')
        let massTime = []
        massDate.current = []
        let massObj = []
        massNum.current = []
        calref.current.innerHTML = ''
        if (document.querySelectorAll('.dates').length < 1) {
            for (let i = 0; i < dates.length; i++) {
                if (massDate.current[massDate.current.length - 1] != dates[i].dt_txt.substring(8, 10)) {
                    if (dates[i].dt_txt.substring(11,13) == '12') {
                        massDate.current.push(dates[i].dt_txt.substring(8, 10))
                        const key = i
                        const value = dates[i]
                        massTime.push(dates[i].dt_txt.substring(5, 7))
                        massObj.push(dates[i])
                        massNum.current.push(i) 
                    } else if(Number(dates[i].dt_txt.substring(8, 10))==date.getDate()){
                        massDate.current.push(dates[i].dt_txt.substring(8, 10))
                        const key = i
                        const value = dates[i]
                        massTime.push(dates[i].dt_txt.substring(5, 7))
                        massObj.push(dates[i])
                        massNum.current.push(i) 
                    }
                }
            }
            console.log(massObj, ' ', massDate.current, ' ', massNum.current, ' ', massTime);
            for (let i = 0; i < massDate.current.length; i++) {
                calref.current.insertAdjacentHTML('beforeEnd', `<div class="dates"  id=${massDate.current[i]}>
                <div class="dlc">
                    <img class="specicon" src='${`https://openweathermap.org/img/wn/${massObj[i].weather[0].icon}@2x.png`}'/>
                    <p>${massDate.current[i]}</p>
                    <p>${getMonthName(massTime[i])}</p>
                </div>
                <div class = "baseinfo">
                    <p id='temp'>${MaxTemperatureOfTheDay(massDate.current[i])}°C</p>
                </div>
                </div>`)
            }
        }
    }, [dates])
    return (
        <div ref={calref} className="Calendar">

        </div>
    )
}