import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../Components/Alerta"
import useAuth from "../hooks/useAuth"

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return
    } 
    try {
      const { data } = await clienteAxios.post('/usuarios/login', {email, password});
      setAlerta({});      
      localStorage.setItem('token', data.token)
      setAuth(data)      
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus {' '}
        <span className="text-slate-700">proyectos</span> 
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rouded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
           <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="email"
            >Email</label>
           <input 
                type="email" 
                placeholder="Email De Registro" 
                className="w-full mt-3 border rounded bg-gray-50"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className="my-5">
           <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
            >Password</label>
           <input type="password" 
                  placeholder="Password De Registro" 
                  className="w-full mt-3 border rounded bg-gray-50"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
            />
        </div>

        <input 
          type="submit"
          value="Iniciar Sesión"
          className="w-full bg-sky-700 rounded hover:bg-sky-800 transition-colors hover:cursor-pointer text-white uppercase font-bold py-3 mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-around">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="registrar"
        >Regístrate</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >Olvidé mi Password</Link>
      </nav>
    </>
  )
}

export default Login