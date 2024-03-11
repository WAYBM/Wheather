import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setdata] = useState({})
  useEffect(()=>{
    const interv = setInterval(()=>{
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=yaroslavl&units=metric&appid=1f488e4442a49d96696206fd8b1d75bb')
      .then(response => response.json())
      .then(data => {
        console.log(data.list[0])
        setdata(data)
      })
    },60000)
    return ()=>{clearInterval(interv)}
  })
    
  return (
    <div className="App">
      {Math.round(data.list[0].main.temp)}
    </div>
  );
}

export default App;
