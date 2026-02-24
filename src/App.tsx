import { useState } from 'react'
import axios from "axios"

function App() {
  const [Tempo, setTempo] = useState("")
  const API_KEY='481390f99d35ba6cce4bb6670ce28239'
  const[cidade,setCidade]=useState('')
  const[onLoading,setLoading]=useState(false)
  const handleKeyPress =(event: { key: string })=>{
    if(event.key==='Enter'){
      getClima()
    }
  }

  const getClima=async()=>{
    try{
      if(!cidade) return;
      setLoading(true)
       const response=await axios.get("https://api.openweathermap.org/data/2.5/weather",{params:{
      appid: API_KEY,
      q:cidade,
      units:'metric'
    }
    });
    console.log(response.data.main)
    setTempo(response.data.main.temp)
    }
    catch(error){
      console.error("Error fetching weather data:", error);
      console.log("Cidade não encontrada")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className='bg-blue-300 h-screen flex flex-col items-center justify-center gap-4'>
        <p>Hello, this is the Find_clima-web app!</p>
        <p>{Tempo}</p>
        <p>Digite o nome da sua cidade</p>
        <input type="text" placeholder='Digite o nome da cidade' value={cidade} onKeyPress={handleKeyPress} onChange={(e) => setCidade(e.target.value)}/>
        <button onClick={getClima} disabled={onLoading} className='bg-blue-600'>Buscar Clima</button>
      </div>
    </>
  )
}

export default App
