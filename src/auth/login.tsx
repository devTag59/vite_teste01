import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
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
        w-64
        ' type="text" placeholder='Digite sua cidade'/>
        </div>
        <Link to="/clima">
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300'>Entrar</button>
        </Link>
    </div>
  )
}
export default Login