import { useState, useEffect, useRef , createElement} from "react";
import { BG } from "./BG"
export default function Calendar({dates}) {
    const calref = useRef('')
    const massNum = useRef([])
    const massDate = useRef([])
    const changeinfo = (e) =>{
        const inf0 = document.querySelectorAll('.info')
        for (let i = 0; i < inf0.length; i++) {
            inf0[i].innerHTML = null
            
        }
        e.insertAdjacentHTML('beforeend', `
        <div class = 'info'>
            ${Math.round(dates[massNum.current[massDate.current.indexOf(e.id)]].main.temp)}°C
        </div>`)
    }
    const select = (e)=>{
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
            }else{
                e.style.width = '30%'
                e.style.border = ' 1px solid black'
                changeinfo(e)
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
        let massTime = []
        massDate.current = []
        let massObj = []
        massNum.current = []
        calref.current.innerHTML = ''
        if (document.querySelectorAll('.dates').length<1) {
            for (let i = 0; i < dates.length; i++) {
                if (massDate.current[massDate.current.length-1]!=dates[i].dt_txt.substring(8,10)) {
                    massDate.current.push(dates[i].dt_txt.substring(8,10))
                    const key = i
                    const value = dates[i]
                    massTime.push(dates[i].dt_txt.substring(5,7))
                    massObj.push(dates[i])
                    massNum.current.push(i)  
                }
            }
            console.log(massObj,' ',massDate.current, ' ', massNum.current, ' ', massTime);
            for (let i = 0; i < massDate.current.length; i++) {
                calref.current.insertAdjacentHTML('beforeEnd', `<div class="dates" style="${`background-image: url(${BG(massObj[i].weather[0].main)})`}" id=${massDate.current[i]}>
                <p>${massDate.current[i]}</p>
                <img class="specicon" src='${`https://openweathermap.org/img/wn/${massObj[i].weather[0].icon}@2x.png`}'/>
                <p>${getMonthName(massTime[i])}</p>
                </div>` )
            }
        }
    },[dates])
    return (
        <div ref={calref} className="Calendar">

        </div>
    )
}