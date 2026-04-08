import { useState, useEffect } from "react";
import axios from "axios";
import { Toggles } from "./components/toggles";

interface WeatherData {
  description: string;
  main: string;
  icon: string;
  [key: string]: any;
}

function Clima() {
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [iconUrl, setIconUrl] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidadePesquisada, setCidadePesquisada] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (!cidade.trim()) {
        setError("Por favor, digite o nome de uma cidade");
        return;
      }
      
      setLoading(true);
      setError("");
      setWeather(null);
      setTemperatura(null);

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            appid: API_KEY,
            q: cidade,
            units: "metric",
            lang: "pt_br",
          },
        },
      );

      setIconUrl(
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      setWeather(response.data.weather[0]);
      setTemperatura(Math.round(response.data.main.temp));
      setCidadePesquisada(cidade);
      
    } catch (error: any) {
      console.error("Erro ao buscar dados de clima:", error);
      if (error.response?.status === 404) {
        setError("Cidade não encontrada. Verifique o nome e tente novamente.");
        setCidadePesquisada("");
      } else {
        setError("Erro ao buscar dados do clima. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex p-4 flex-col items-center justify-center gap-6">
      {/* Header */}
      <div className="items-center justify-center flex flex-col gap-2 text-center">
        <h1 className="text-white font-bold text-5xl tracking-tight">FIND-CLIMA</h1>
        <p className="text-gray-300 text-lg">Encontre o clima da sua cidade</p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <input
          className="outline-none border-none rounded-lg p-3 w-full bg-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
          type="text"
          placeholder="Digite o nome da cidade"
          value={cidade}
          onKeyPress={handleKeyPress}
          onChange={(e) => setCidade(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={getClima}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Pesquisar"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-6 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Main Content - Weather Display and Toggles Side by Side */}
      <div className="w-full min-h-92 max-h-screen max-w-6xl flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-6">
        
        {/* Weather Display - Always Visible */}
        <div className="flex-1 bg-gray-700/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-3xl">
          {weather && temperatura !== null ? (
            <div className="flex flex-col items-center justify-center p-8 gap-4 h-full">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {cidadePesquisada.charAt(0).toUpperCase() + cidadePesquisada.slice(1)}
                </h2>
                <p className="text-6xl font-bold text-blue-400 mb-2">
                  {temperatura}°C
                </p>
                <p className="text-xl text-gray-200 capitalize">
                  {weather.description || weather.main}
                </p>
              </div>
              {iconUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={iconUrl}
                    alt={weather.description || "Ícone do clima"}
                    className="w-32 h-32"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 h-full min-h-[300px]">
              <div className="text-center text-gray-400">
                <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <p className="text-lg">Nenhuma cidade pesquisada</p>
                <p className="text-sm mt-2">Digite o nome de uma cidade acima</p>
              </div>
            </div>
          )}
        </div>

        {/* Toggles Component */}
        <div className="flex-1 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden h-80 min-w-20">
          <Toggles />
        </div>
      </div>
    </div>
  );
}

export default Clima;