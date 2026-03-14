import axios from "axios";
import {useState} from "react";

function Logon() {
    const [nome,setNome]=useState("")
    const [senha,setSenha]=useState("")
    const setUsers=async()=>{
    try{
        const users=await axios.post("http://10.1.19.2:3000/users",{
            nome:nome,
            senha:senha,
            status:true
        })
        console.log(users.data)
    }catch(error){
        console.error("Error fetching weather data:", error);
        console.log("Nenhum usuário encontrado")
    }
    
}
    return(<>
    <div className="
    bg-gray-900
    min-h-screen
    flex 
    flex-col
    lg:flex-row 
    items-center
    justify-center 
    text-center 
    p-4">
        <div className="w-full 
    lg:w-1/2              {/* lg: metade da tela */}
    flex 
    flex-col 
    items-center 
    lg:items-start       {/* lg: alinhado à esquerda */}
    justify-center 
    text-center 
    lg:text-left         {/* lg: texto à esquerda */}
    p-6
    space-y-4">
        <div className="
        flex
        flex-col
        items-center
        ">
            <p className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            leading-tight
            font-bold
            text-white
            
            ">Registrar novo usuário</p>
            <p className="
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            text-gray-300
            ">Digite seu nome e senha para criar uma conta</p>
        </div>
        </div>
        <div className="w-full 
    lg:w-1/2              {/* lg: metade da tela */}
    flex 
    items-center 
    justify-center 
    p-4">
        <div className="
        w-full
        max-w-md
        shadow-2xl
        flex
        flex-col
        bg-gray-800
        p-6
        rounded-lg
        space-y-4
        ">
            <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
            <button onClick={setUsers}>Registrar</button>
        </div>
        </div>
    </div>
    </>)
}
export default Logon