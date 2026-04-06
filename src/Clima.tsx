import { useState, useEffect } from "react";
import axios from "axios";
import { Toggles } from "./components/toggles";

interface WeatherData {
  description: string;
  [key: string]: any;
}

function Clima() {
  const [temperatura, setTemperatura] = useState("");
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [iconUrl, setIconUrl] = useState("");
  const [cidade, setCidade] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "481390f99d35ba6cce4bb6670ce28239";

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getClima();
    }
  };

  useEffect(() => {
    document.title = "Find Clima - Página de clima";
  }, []);

  const getClima = async () => {
    try {
      if (!cidade) return;
      setLoading(true);

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            appid: API_KEY,
            q: cidade,
            units: "metric",
          },
        },
      );

      setIconUrl(
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      );
      setWeather(response.data.weather);
      setTemperatura(response.data.main.temp);
    } catch (error) {
      console.error("Erro ao buscar dados de clima:", error);
      alert("Cidade não encontrada");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex p-2 flex-col items-baseline justify-center gap-4">
      <p className="text-white font-bold text-5xl">BEM VINDO AO FIND-CLIMA</p>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          className="outline-none border-none rounded-lg p-3 w-auto md:w-lg bg-gray-500 text-white placeholder:text-blue-300"
          type="text"
          placeholder="Digite o nome da cidade"
          value={cidade}
          onKeyPress={handleKeyPress}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getClima}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Pesquisar"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Toggles />
        <div className="w-92 h-92 flex flex-col items-center justify-evenly bg-gray-800 md:bg-gray-600 mb-4 rounded-3xl text-white font-bold">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-2xl">{cidade || "sua cidade"}
              <p>{temperatura} °C</p>
              <p>
                {weather.length > 0
                  ? weather[0].main
                  : "Sem dados de clima"}
              </p>
            </div>
            <div/>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt="Ícone do clima"
                  className="w-40 h-40"
                />
              )}
          </div>
          <p>Digite o nome da sua cidade</p>
        </div>
      </div>
    </div>
  );
}

export default Clima;
