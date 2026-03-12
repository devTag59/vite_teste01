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
    <div>
        <text style={{color:"white", font:"bold"}}>Registrar novo usuário</text>
        <text style={{color:"white", font:"bold"}}>Digite seu nome e senha para criar uma conta</text>
    </div>
        <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
        <button onClick={setUsers}>Registrar</button>
        </div>
    </>)
}
export default Logon