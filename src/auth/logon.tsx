import axios from "axios";
import {useEffect, useState} from "react";
import Modal from "../components/modal";
import { useNavigate } from "react-router";

function Logon() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [nome,setNome]=useState("")
    const [senha,setSenha]=useState("")
    const [text,setText]=useState("")
    useEffect(()=>{
        document.title="Find Clima - Registrar"
    })
    const setUsers=async()=>{
        if(!nome || !senha){
            setText("Preencha todos os campos")
            setOpen(true)
            return
        }else{
 try{
        const users=await axios.post("https://api.jsonbin.io/v3/b/69efa28b856a6821897be31c/latest",{
            Headers:{
                "X-Master-Key":"$2a$10$Rk/bYXkdIIOsIGme/JtdzOH8rpAG9zu6DnR54iakKht5ivGx3ZxfO"
            },
            nome:nome,
            senha:senha,
            status:true
        })
        if(users.status===201){
           setOpen(true)
           setText(`Usuário criado com sucesso!`)
        }
        console.log(users.data)
    }catch(error){
        console.error("Erro tentando aceder os usuarios:", error);
        console.log("Nenhum usuário encontrado")
    }
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
        <div className="w-full 
    lg:w-1/2              {/* lg: metade da tela */}
    flex 
    items-center 
    justify-center 
    p-4">
        {/*formulário*/}
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div onClick={()=>navigate("/login")} className="
            min-w-sm
            text-white
            bg-blue-900
              flex
              flex-col
              p-6
              rounded-2xl
              justify-center
              items-center
            ">
                <p className="
                font-bold
                ">{text}</p>
                <button className="
                w-fit
                mt-4
                bg-blue-500
                hover:bg-blue-600
                text-white
                font-bold
                py-2
                px-4
                rounded-lg
                transition-colors
                duration-300
                " onClick={()=> navigate("/login")}>
                    Voltar para a pagina de login
                </button>

            </div>
        </Modal>
        <div className="
        w-full
        max-w-md
        shadow-none
        md:shadow-2xl
        flex
        flex-col
        bg-gray-800
        p-6
        rounded-lg
        space-y-4
        ">
            <p className="
            text-white
            font-bold
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            ">Criando a minha conta</p>
            <input className="
            outline-none
            bg-gray-600
            rounded-lg
            w-full
            border-gray-500
            border-2
            p-4
            text-white
            placeholder-gray-300
            focus:border-blue-500
            transition-colors
            duration-300
            " type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
            <input className="
            outline-none
            bg-gray-600
            rounded-lg
            w-full
            border-gray-500
            border-2
            p-4
            text-white
            placeholder-gray-300
            focus:border-blue-500
            transitions-colors
            duration-300
            " type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
            <button className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            font-bold
            py-2
            px-4
            rounded-lg
            transition-colors
            duration-300
            " onClick={setUsers}>Registrar</button>
        </div>
        </div>
    </div>
    </>)
}
export default Logon