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
    h-screen
    w-full 
    lg:w-1/2
    flex 
    flex-col
    lg:flex-row 
    items-center 
    lg:items-start
    justify-center 
    text-center 
    lg:text-left
    p-6
    space-y-4">
        <div className="w-full lg:w-1/2 h-full bg-amber-600">
            <p style={{color:"white", font:"bold"}}>Registrar novo usuário</p>
            <p style={{color:"white", font:"bold"}}>Digite seu nome e senha para criar uma conta</p>
        </div>
        <div className="w-screen h-full flex flex-col items-center justify-center gap-4">
            <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
            <button onClick={setUsers}>Registrar</button>
        </div>
    </div>
    </>)
}
export default Logon