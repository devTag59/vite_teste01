import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  nome: string;
  senha: any;
  status: boolean;

}

function Login() {
  const navigate = useNavigate()
  const[users,setUsers]=useState<User[]>([])
  const[nome,setNome]=useState('')
  useEffect(()=>{
    getUsers()
  },[])
  useEffect(()=>{
    document.title=`Find CLima-${title}`
  })
  const [title,setTitle]=useState("Pagina de Login")
  const getUsers=async()=>{
    try{
      const users=await fetch("http://10.1.19.2:3000/users")
      const dataUsers =await users.json()
      setUsers(dataUsers)
      console.log(dataUsers)
    }catch(error){
      setTitle("Erro de internet")
      console.error("Error fetching weather data:", error);
      console.log("Nenhum usuário encontrado")
    }
  }
  const handleLogin=()=>{
    const userFind=users.find((user)=>user.nome===nome)
    if(userFind){
      console.log("Usuário encontrado:", userFind)
      navigate("/clima")
    }else{
      console.log("Usuário não encontrado")
      setTitle("Usuário não encontrado")
    }
  }
  return (
    <div className='bg-gray-900 h-screen flex items-center justify-center gap-4'>
      <div className='h-full w-full flex-col content-center items-center gap-4 justify-center text-center'>
            <p className='text-white font-bold text-5xl'>BEM VINDO AO FIND-CLIMA</p>
            <p className='text-white'>Informe seu email e senha para continuar</p>
        </div>
        <div className='h-full w-full inline-flex items-center justify-center'>
          <div style={{color:'white', font:"bold"}} className='w-1/2 h-1/2 flex flex-col items-center justify-evenly bg-gray-800 mb-4 rounded-3xl'> 
        <p className='text-5xl'>Informe o seu email</p>
        <input className=' outline-none
        border-2 
        border-gray-300 
        rounded-lg 
        p-3
        w-3/4'
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        type="text" placeholder='Qual o seu email'/>
          <button className='bg-blue-500
                        text-white
                        font-bold
                        w-3/4
                        py-2 px-4
                        rounded-lg
                        hover:bg-blue-600
                        transition-colors
                        duration-300' onClick={handleLogin}>Entrar
          </button>
        
        </div>
      </div>   
    </div>
  )
}
export default Login