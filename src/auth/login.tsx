import { useEffect, useState } from 'react'
import { supabase} from "../lib/supabase"
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/modal';

function Login() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')      // Alterado de 'nome' para 'email'
  const [password, setPassword] = useState('') // Alterado de 'senha' para 'password'
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
  console.log('Supabase está funcionando?', !!supabase)
}, [])
  const handleLogin = async () => {          // Adicionado 'async'

    
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos')
      setOpen(true)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,                                  // Usa 'email' em vez de 'nome'
      password                                // Usa 'password' em vez de 'senha'
    })

    if (error) {
      setErrorMessage('Email ou senha incorretos')
      setOpen(true)
    } else {
      console.log("Login bem sucedido:", data.user)
      navigate("/clima")
    }
  }

  /*
  // CÓDIGO ANTIGO COMENTADO (JSONBin) - MANTIDO
  interface User {
    nome: string;
    senha: any;
    status: boolean;
  }

  useEffect(()=>{
    getUsers()
  },[])

  useEffect(()=>{
    document.title=`Find CLima-${title}`
  })

  const [title,setTitle]=useState("Pagina de Login")
  const [users,setUsers]=useState<User[]>([])

  const getUsers=async()=>{
    try{
      const users=await fetch("https://api.jsonbin.io/v3/b/69efa28b856a6821897be31c/latest",{
        headers:{
          "X-Access-Key":"$2a$10$Rk/bYXkdIIOsIGme/JtdzOH8rpAG9zu6DnR54iakKht5ivGx3ZxfO"
        }
      })
      const dataUsers =await users.json()
      setUsers(dataUsers.record.users)
      console.log(dataUsers)
    }catch(error){
      setTitle("Erro de internet")
      console.error("Erro ao encontrar o usuário:", error);
      console.log("Nenhum usuário encontrado")
    }
  }

  const handleLoginAntigo=()=>{
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
  */

  // Código para título da página
  useEffect(() => {
    document.title = 'Find Clima - Login'
  }, [])

  return (
    <div className='
      bg-gray-900 
      min-h-screen           
      flex 
      flex-col               
      lg:flex-row            
      items-center 
      justify-center 
      gap-4 
      p-4
    '>
      {/* Modal de Erro */}
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
          <p className="text-center font-bold">
            {errorMessage}
          </p>
        </div>
      </Modal>

      {/* Lado esquerdo - texto */}
      <div className='
        w-full 
        lg:w-1/2              
        flex 
        flex-col 
        items-center 
        lg:items-start       
        justify-center 
        text-center 
        lg:text-left         
        p-6
        space-y-4
      '>
        <p className='
          text-white 
          font-bold 
          text-3xl            
          sm:text-4xl         
          md:text-5xl         
          lg:text-6xl         
          leading-tight
        '>
          BEM VINDO AO<br />FIND-CLIMA
        </p>
        <p className='
          text-white 
          text-sm             
          sm:text-base        
          md:text-lg          
          opacity-90
        '>
          Informe seu email e senha para continuar
        </p>
      </div>
      
      {/* Lado direito - formulário */}
      <div className='
        w-full 
        lg:w-1/2              
        flex 
        items-center 
        justify-center 
        p-4
      '>
        <div className='
          w-full 
          max-w-md            
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
              text-3xl        
              md:text-4xl     
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          
          <Link 
            to="/logon" 
            className='
              bg-green-500
              text-white
              font-bold
              w-full
              py-4
              px-6
              rounded-lg
              hover:bg-green-600
              transition-colors
              duration-300
              transform
              hover:scale-105
              active:scale-95
              text-lg
              text-center
              block
            '
          >
            Criar Conta
          </Link>
        </div>
      </div>   
    </div>
  )
}

export default Login