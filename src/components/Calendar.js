import { useState, useEffect, useRef } from "react";
export default function Calendar({dates}) {
    const calref = useRef('')
    const select = (e)=>{
        e.id = ``
    }
    useEffect(()=>{
        let cal = document.getElementsByClassName('.Calendar')
        console.log(cal);
        let mass = []
        if (document.querySelectorAll('.dates').length<1) {
            for (let i = 0; i < dates.length; i++) {
                if(mass[mass.length-1]!=dates[i].dt_txt.substring(8,10)){
                    mass.push(dates[i].dt_txt.substring(8,10))
                }
            }
            for (let i = 0; i < mass.length; i++) {
                console.log(mass[i]);
                calref.current.insertAdjacentHTML('beforeEnd', `<div class="dates">${mass[i]}</div>` )
            }
        }
        console.log(mass);
    },[])
    return (
        <div ref={calref} className="Calendar" onClick={(e)=>{
            console.log(e.target.id);
        }}>

        </div>
    )
}