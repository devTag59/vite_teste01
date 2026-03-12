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
    return(<div>
        <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
        <button onClick={setUsers}>Registrar</button>
    </div>)
}
export default Logon