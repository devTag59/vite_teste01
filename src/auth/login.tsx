import { useEffect, useState } from 'react'
import { Link, Route, Router, useNavigate } from 'react-router-dom'

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
  const getUsers=async()=>{
    try{
      const users=await fetch("http://10.1.19.2:3000/users")
      const dataUsers =await users.json()
      setUsers(dataUsers)
      console.log(dataUsers)
    }catch(error){
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
    }
  }
  return (
    <div className='bg-gray-200 h-screen flex flex-col items-center justify-center gap-4'>
        <p className='text-white font-bold text-5xl'>BEM VINDO AO FIND-CLIMA</p>
        <div style={{color:'white', font:"bold"}} className='w-72 h-72 flex flex-col items-center justify-evenly bg-gray-600 mb-4 rounded-3xl'> 
        <p>Informe o seu email</p>
        <input className=' outline-none
        border-2 
        border-gray-300 
        rounded-lg 
        p-3
        w-64'
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        type="text" placeholder='Digite sua cidade'/>
        </div>
        
        <button className='bg-blue-500
                        text-white
                        font-bold
                        py-2 px-4
                        rounded-lg
                        hover:bg-blue-600
                        transition-colors
                        duration-300' onClick={handleLogin}>Entrar</button>
        
    </div>
  )
}
export default Login