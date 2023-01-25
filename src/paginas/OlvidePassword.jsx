
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../Components/Alerta';

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email});

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso y no pierdas tus {' '}
        <span className="text-slate-700">proyectos</span> 
      </h1>

      {msg && <Alerta alerta={alerta} />}

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

        <input 
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-sky-700 rounded hover:bg-sky-800 transition-colors hover:cursor-pointer text-white uppercase font-bold py-3 mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-around">
      <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

      <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >Regístrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword