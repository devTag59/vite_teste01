import { useEffect, useState } from 'react';
import axios from 'axios';
export function Toggles() {
    const [climas, setClimas] = useState<any[]>([]);
useEffect(()=>{
    const getClima=async()=>{
        try{
            const cidades=["São Paulo","Rio de Janeiro","Belo Horizonte"];
            const promises=cidades.map((cidade)=>
            axios.get("https://api.openweathermap.org/data/2.5/weather",{
                params:{
                appid: '481390f99d35ba6cce4bb6670ce28239',
                q:cidade,
                units:'metric'},
            })
        )
        const responses=await Promise.all(promises)
        const dados=responses.map(response=>response.data)
        console.log(responses)
        setClimas(dados)
        }
        catch(error){
            console.error("Error fetching weather data:", error);
        }
    }
    getClima()
            
},[])

  return (
   <div>
      <h2>Clima das cidades</h2>
      {climas.map((cidade, index) => (
        <form key={index} style={{margin: "10px", padding: "10px", font:"bold", backgroundColor: "#333", color: "white", borderRadius: "8px"}}>
          <h3>{cidade.name}</h3>
          <label>
            Temperatura:
            <input type="text" value={`${cidade.main.temp} °C`} readOnly />
          </label>
          <br />
          <label>
            Condição:
            <input type="text" value={cidade.weather[0].description} readOnly />
          </label>
          <br />
          <label>
            Umidade:
            <input type="text" value={`${cidade.main.humidity}%`} readOnly />
          </label>
        </form>
      ))}
    </div>
  );
}
