import { useEffect, useState } from 'react';
import axios from 'axios';
import "./toggles.css"

export function Toggles() {
  const [climas, setClimas] = useState<any[]>([]);

  useEffect(() => {
    const getClima = async () => {
      try {
        const cidades = ["São Paulo", "Rio de Janeiro", "Belo Horizonte"];
        const promises = cidades.map((cidade) =>
          axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              appid: '481390f99d35ba6cce4bb6670ce28239',
              q: cidade,
              units: 'metric'
            },
          })
        );
        const responses = await Promise.all(promises);
        const dados = responses.map(response => response.data);
        setClimas(dados);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getClima();
  }, []);

  return (
    <div className="h-full w-full px-6 text-white items-center justify-center overflow-y-scroll overflow-x-hidden scrollbar-hidden">
      <h2 className="text-2xl font-bold mb-4">Clima das cidades</h2>
      {climas.map((cidade, index) => (
        <form
          key={index}
          className="mb-4 max-h-32 flex flex-col md:flex-row justify-between gap-2 items-start rounded-lg shadow-lg bg-gray-800 shadow-gray-900 p-2"
        >
          <div className='flex flex-col justify-around'>
            <h3 className="text-xs font-semibold">{cidade.name}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${cidade.weather[0].icon}@2x.png`}
              alt={cidade.weather[0].description}
              className="max-w-fit h-auto mb-4"
            />
          </div>

          <label className="flex flex-col gap-4 items-baseline justify-around">
            <span className="text-2xl font-bold">Temperatura</span>
            <input
              type="text"
              value={`${cidade.main.temp} °C`}
              readOnly
             className="w-full cursor-pointer outline-none border-none"
            />
          </label>

          <label className="flex flex-col gap-4 items-baseline justify-around">
            <span className="text-2xl font-bold ">Condição</span>
            <input
              type="text"
              value={cidade.weather[0].description}
              readOnly
              className="w-full cursor-pointer outline-none border-none"
            />
          </label>

          <label className="flex flex-col gap-4 items-baseline justify-around">
            <span className="text-2xl font-bold">Umidade</span>
            <input
              type="text"
              value={`${cidade.main.humidity}%`}
              readOnly
              className="w-full cursor-pointer outline-none border-none"
            />
          </label>
        </form>
      ))}
    </div>
  );
}
