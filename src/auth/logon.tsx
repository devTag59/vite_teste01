import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase"; // Importação do Supabase

function Logon() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")        // Alterado de 'nome' para 'email'
  const [password, setPassword] = useState("")  // Alterado de 'senha' para 'password'
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false) // Estado de carregamento

  useEffect(() => {
    document.title = "Find Clima - Registrar"
  }, [])

  // NOVA FUNÇÃO COM SUPABASE
  const handleSignUp = async () => {
    // Validação de campos vazios
    if (!email || !password) {
      setText("Preencha todos os campos")
      setOpen(true)
      return
    }

    // Validação de força da senha
    if (password.length < 6) {
      setText("A senha deve ter pelo menos 6 caracteres")
      setOpen(true)
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        // Tratamento de erros específicos do Supabase
        if (error.message.includes("already registered")) {
          setText("Este email já está cadastrado")
        } else {
          setText("Erro ao criar conta: " + error.message)
        }
        setOpen(true)
      } else {
        // Sucesso!
        setText("Conta criada com sucesso! Você será redirecionado para o login.")
        setOpen(true)
        
        // Fecha o modal e redireciona após 2 segundos
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    } catch (error) {
      setText("Erro de conexão. Tente novamente.")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  /*
  // CÓDIGO ANTIGO COM JSONBIN - MANTIDO COMENTADO
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const setUsers = async () => {
    if (!nome || !senha) {
      setText("Preencha todos os campos")
      setOpen(true)
      return
    }

    try {
      // 1. Busca os usuários atuais
      const res = await fetch("https://api.jsonbin.io/v3/b/69efa28b856a6821897be31c/latest", {
        headers: {
          "X-Access-Key": "$2a$10$Rk/bYXkdIIOsIGme/JtdzOH8rpAG9zu6DnR54iakKht5ivGx3ZxfO"
        }
      })
      const data = await res.json()
      const users = data.record.users

      // 2. Cria o novo usuário
      const novoUser = {
        id: crypto.randomUUID(),
        nome: nome,
        senha: senha,
        status: true
      }

      // 3. Atualiza o bin com o novo usuário
      const updatedUsers = [...users, novoUser]
      await fetch("https://api.jsonbin.io/v3/b/69efa28b856a6821897be31c", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "$2a$10$Rk/bYXkdIIOsIGme/JtdzOH8rpAG9zu6DnR54iakKht5ivGx3ZxfO"
        },
        body: JSON.stringify({ users: updatedUsers })
      })

      setText("Conta criada com sucesso!")
      setOpen(true)

    } catch (error) {
      setText("Erro ao criar conta, tente novamente.")
      setOpen(true)
    }
  }
  */

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col lg:flex-row items-center justify-center text-center p-4">
        {/* Lado esquerdo - Texto */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left p-6 space-y-4">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white">
            Registrar novo usuário
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            Digite seu email e senha para criar uma conta
          </p>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          {/* Modal de feedback */}
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div className="min-w-sm text-white bg-blue-900 flex flex-col p-6 rounded-2xl justify-center items-center">
              <p className="font-bold">{text}</p>
              <button
                className="w-fit mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={() => {
                  setOpen(false)
                  // Se a conta foi criada com sucesso, redireciona
                  if (text.includes("sucesso")) {
                    navigate("/login")
                  }
                }}
              >
                {text.includes("sucesso") ? "Ir para login" : "Voltar"}
              </button>
            </div>
          </Modal>

          {/* Card do formulário */}
          <div className="w-full max-w-md shadow-none md:shadow-2xl flex flex-col bg-gray-800 p-6 rounded-lg space-y-4">
            <p className="text-white font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Criando a minha conta
            </p>
            
            <input
              className="outline-none bg-gray-600 rounded-lg w-full border-gray-500 border-2 p-4 text-white placeholder-gray-300 focus:border-blue-500 transition-colors duration-300"
              type="email"  // Alterado para type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              className="outline-none bg-gray-600 rounded-lg w-full border-gray-500 border-2 p-4 text-white placeholder-gray-300 focus:border-blue-500 transition-colors duration-300"
              type="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Registrar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Logon