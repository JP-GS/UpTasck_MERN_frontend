import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos"
import PreviewProyectos from "../Components/PreviewProyectos";
import Alerta from "../Components/Alerta";

const Proyectos = () => {
  const {proyectos, alerta} = useProyectos();    
  const {msg} = alerta

  return (
    <>

      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta}/>}

      <div className="bg-white rounded-lg shadow mt-10">
        {proyectos.length 
          ?
            proyectos.map(proyecto => (
              <PreviewProyectos
                key={proyecto._id}
                proyecto={proyecto}
              />
            ))
          : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos</p> }
      </div>

    </>
  )
}

export default Proyectos