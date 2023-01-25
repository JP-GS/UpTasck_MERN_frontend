import { useState } from 'react';

import { Link } from "react-router-dom";

import Alerta from '../Components/Alerta.jsx';

import clienteAxios from '../config/clienteAxios.jsx';

const Registrar = () => {
  const [nombre, setNombre ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [repetirPassword, setRepetirPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){      
      setAlerta({
          msg: "Todos los campos son obligatorios",
          error: true
        })
        return      
    }

    if(password !== repetirPassword){      
      setAlerta({
          msg: "Los passwords no son iguales",
          error: true
        })
        return      
    }

    if(password.length < 6){      
      setAlerta({
          msg: "El Password debe tener como mínimo 6 dígitos",
          error: true
        })
        return      
    }
    setAlerta({});

    //Crear el usuario en la api
    try {
      const {data} = await clienteAxios.post('/usuarios' , { nombre, email, password });
      setAlerta({
        msg: data.msg,
        error: false
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {' '}
        <span className="text-slate-700">proyectos</span> 
      </h1>

      { msg && <Alerta alerta={alerta} />}

      <form 
        className="my-10 bg-white shadow rouded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
      <div className="my-5">
           <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="nombre"
            >Nombre</label>
           <input 
                type="text" 
                placeholder="Tu Nombre" 
                className="w-full mt-3 border rounded bg-gray-50"
                id="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

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
           <input 
                type="password" 
                placeholder="Password De Registro" 
                className="w-full mt-3 border rounded bg-gray-50"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>

        <div className="my-5">
           <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password2"
            >Repetir Password</label>
           <input 
                  type="password" 
                  placeholder="Repetir Password" 
                  className="w-full mt-3 border rounded bg-gray-50"
                  id="password2"
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>
        <input 
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
        >Olvidé mi Password</Link>
      </nav>
    </>
  )
}

export default Registrar