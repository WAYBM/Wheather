import { useState, useEffect, useRef } from "react";
export default function Calendar({dates}) {
    const calref = useRef('')
    const select = (e)=>{
        let dates = document.querySelectorAll('.dates')
        if (e.className != 'Calendar') {
            for (let i = 0; i < dates.length; i++) {
                dates[i].style = 'border: 1px solid grey;'
                
            }
            if (e.parentNode.className == 'dates') {
                e.parentNode.style = 'border: 1px solid lime;'
            }else{
                e.style = 'border: 1px solid lime;'
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
        if (document.querySelectorAll('.dates').length<1) {
            for (let i = 0; i < dates.length; i++) {
                if (mass2[mass2.length-1]!=dates[i].dt_txt.substring(8,10)) {
                    mass2.push(dates[i].dt_txt.substring(8,10))
                    const key = i
                    const value = dates[i]
                    mass.push(dates[i].dt_txt.substring(5,7))
                    mass3.push(i)  
                }
            }
            console.log(mass[0][0].dt_txt);
            for (let i = 0; i < mass2.length; i++) {
                calref.current.insertAdjacentHTML('beforeEnd', `<div class="dates" id=${mass2[i]}><p>${mass2[i]}</p><p>${getMonthName(mass[i])}</p></div>` )
            }
        }
        console.log(date.getMonth());
    },[])
    return (
        <div ref={calref} className="Calendar" onClick={(e)=>{
            select(e.target)
        }}>

        </div>
    )
}