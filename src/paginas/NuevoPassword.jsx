
import { useState, useEffect }  from 'react';
import { Link, useParams} from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../Components/Alerta';

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
    
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6 ) {
      setAlerta({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true
      })
      return
    }
    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      setTokenValido(false)
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
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus {' '}
        <span className="text-slate-700">proyectos</span> 
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      { tokenValido && (
        <form 
          className="my-10 bg-white shadow rouded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="password"
              >Nuevo Password</label>
            <input type="password" 
                    placeholder="Escribe Tu Nuevo Password" 
                    className="w-full mt-3 border rounded bg-gray-50"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
              />
          </div>

          <input 
            type="submit"
            value="Guardar Nuevo Password"
            className="w-full bg-sky-700 rounded hover:bg-sky-800 transition-colors hover:cursor-pointer text-white uppercase font-bold py-3 mb-5"
          />
        </form>
      )}

        {passwordModificado && ( 
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >Inicia Sesión</Link>
        )}
      
    </>
  )
}

export default NuevoPassword