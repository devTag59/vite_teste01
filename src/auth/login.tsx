import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/modal';

interface User {
  nome: string;
  senha: any;
  status: boolean;

}

function Login() {
  const navigate = useNavigate()
  const[users,setUsers]=useState<User[]>([])
  const [open, setOpen] = useState(false);
  const[nome,setNome]=useState('')
  const[senha,setSenha]=useState('')
  useEffect(()=>{
    getUsers()
  },[])
  useEffect(()=>{
    document.title=`Find CLima-${title}`
  })
  const [title,setTitle]=useState("Pagina de Login")
  const getUsers=async()=>{
     
      try{
      const users=await fetch("https://api.jsonbin.io/v3/b/69efa28b856a6821897be31c")
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
    if (!nome || !senha) {
      setOpen(true)
    }else{
    const userFind=users.find((user)=>user.nome===nome && user.senha===senha)
    if(userFind){
      console.log("Usuário encontrado:", userFind)
      navigate("/clima")
    }else{
      console.log("Usuário não encontrado")
      setTitle("Usuário não encontrado")
    }
    }
  }
  return (
    <div className='
  bg-gray-900 
  min-h-screen           {/* usa min-h-screen em vez de h-screen */}
  flex 
  flex-col               {/* mobile: empilhado */}
  lg:flex-row            {/* lg: lado a lado */}
  items-center 
  justify-center 
  gap-4 
  p-4
'>
  <Modal isOpen={open} onClose={() => setOpen(false)}>
   <div className="
            min-w-sm
            text-white
            bg-blue-900
              flex
              flex-col
              p-6
              rounded-2xl
            ">
                <p className="
                text-center font-bold
                "> Por favor <br/>Preencha todos os campos</p>
            </div>
  </Modal>
  {/* Lado esquerdo - texto */}
  <div className='
    w-full 
    lg:w-1/2              {/* lg: metade da tela */}
    flex 
    flex-col 
    items-center 
    lg:items-start       {/* lg: alinhado à esquerda */}
    justify-center 
    text-center 
    lg:text-left         {/* lg: texto à esquerda */}
    p-6
    space-y-4
  '>
    <p className='
      text-white 
      font-bold 
      text-3xl            {/* mobile: 30px */}
      sm:text-4xl         {/* sm: 36px */}
      md:text-5xl         {/* md: 48px */}
      lg:text-6xl         {/* lg: 60px */}
      leading-tight
    '>
      BEM VINDO AO<br />FIND-CLIMA
    </p>
    <p className='
      text-white 
      text-sm             {/* mobile: 14px */}
      sm:text-base        {/* sm: 16px */}
      md:text-lg          {/* md: 18px */}
      opacity-90
    '>
      Informe seu email e senha para continuar
    </p>
  </div>
  
  {/* Lado direito - formulário */}
  <div className='
    w-full 
    lg:w-1/2              {/* lg: metade da tela */}
    flex 
    items-center 
    justify-center 
    p-4
  '>
    <div className='
      w-full 
      max-w-md            {/* largura máxima de 448px */}
      flex 
      flex-col 
      items-center 
      justify-center 
      bg-gray-800 
      p-8
      rounded-3xl
      shadow-none
      md:shadow-2xl
      space-y-6
    '>
      <div className='text-center space-y-2'>
        <p className='
          text-white 
          font-bold 
          text-3xl        {/* mobile: 30px */}
          md:text-4xl     {/* md: 36px */}
        '>
          Login
        </p>
        <p className='
          text-gray-400 
          text-sm
        '>
          Informe seu email para continuar
        </p>
      </div>
      
      <input 
        className='
          outline-none
          border-2 
          border-gray-600 
          rounded-lg 
          p-4
          w-full
          bg-gray-700
          text-white
          placeholder-gray-400
          focus:border-blue-500
          transition-colors
          duration-300
        '
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        type="text" 
        placeholder='Digite seu email'
      />
      <input 
        className='
          outline-none
          border-2 
          border-gray-600 
          rounded-lg 
          p-4
          w-full
          bg-gray-700
          text-white
          placeholder-gray-400
          focus:border-blue-500
          transition-colors
          duration-300
        '
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        type="password" 
        placeholder='Digite sua senha'
      />
      
      <button 
        className='
          bg-blue-500
          text-white
          font-bold
          w-full
          py-4
          px-6
          rounded-lg
          hover:bg-blue-600
          transition-colors
          duration-300
          transform
          hover:scale-105
          active:scale-95
          text-lg
        ' 
        onClick={handleLogin}
      >
        Entrar
      </button>
      
        <button 
          className='
            bg-blue-500
            text-white
            font-bold
            w-full
            py-4
            px-6
            rounded-lg
            hover:bg-blue-600
            transition-colors
            duration-300
            transform
            hover:scale-105
            active:scale-95
            text-lg
          ' >
          <Link to="/logon">Criar Conta</Link>
        </button>
      
    </div>
  </div>   
</div>  )
}
export default Login