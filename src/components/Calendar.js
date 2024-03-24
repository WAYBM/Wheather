import { useState, useEffect, useRef } from "react";
export default function Calendar({dates}) {
    const calref = useRef('null')
    useEffect(()=>{
        let cal = document.getElementsByClassName('.Calendar')
        console.log(cal);
        let mass = []
        for (let i = 0; i < dates.length; i++) {
            if(mass[mass.length-1]!=dates[i].dt_txt.substring(8,10)){
                mass.push(dates[i].dt_txt.substring(8,10))
            }
        }
        for (let i = 0; i < mass.length; i++) {
            calref.current.insertAdjacentHTML('beforeEnd', <div className="dates">mass[i]</div> )
        }
        console.log(mass);
    },[])
    return (
        <div ref={calref} className="Calendar">

        </div>
    )
}