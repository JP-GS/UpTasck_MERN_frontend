import { useEffect } from "react"
import FormularioColaborador from "../Components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from '../Components/Alerta'

const NuevoColaborador = () => {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos();
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
    
  }, [])
  
  if(!proyecto?._id) return <Alerta alerta={alerta} />
  
  return (
    <>
    <h1 className="font-black text-4xl">Añadir Colaborador/a al Proyecto: 
      <span className="text-sky-600 uppercase font-bold"> {proyecto.nombre}</span></h1>
    
    <div className="flex justify-center mt-10">
        <FormularioColaborador/>
    </div>
    
    {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
      <div className="mt-10 flex justify-center">
        <div className="py-10 px-5 bg-white md:w-1/2 rounded-lg shadow-lg w-full">
          <h2 className="text-center font-bold mb-10 text-2xl">Resultado:</h2>

          <div className="flex justify-between items-center uppercase font-bold flex-col">
            <p>{colaborador.nombre}</p>

            <button
              type="button"
              className="bg-slate-500 rounded uppercase text-white text-sm font-bold px-5 py-2 mt-5"
              onClick={ () => agregarColaborador({
                email: colaborador.email
              }) }
            >Agregar al Proyecto</button>
          </div>
        </div>
      </div>
    ) }
    </>
  )
}

export default NuevoColaborador