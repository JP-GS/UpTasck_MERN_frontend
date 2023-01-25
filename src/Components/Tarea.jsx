import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos
    ();
    const admin = useAdmin()
    const {nombre, descripcion, fechaEntrega, prioridad, estado, _id} = tarea;


  return (
    <div className="border-b p-5 flex justify-between items-center">

        <div className="flex flex-col items-start">
            <p className="mb-1 text-xl font-bold">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad:{prioridad}</p>
            {estado && 
                <p className="text-sm bg-green-500 uppercase p-1 rounded-lg text-white font-bold">Completada por: {tarea.completado.nombre}</p>}
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
            {admin && (
                <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm"
                    onClick={ () => handleModalEditarTarea(tarea) }
                >Editar</button>
            )}
             
            <button
                    className={`${estado ? 'bg-sky-600' : 'bg-gray-500'} px-4 py-3 text-white uppercase rounded-lg font-bold text-sm`}
                    onClick={() => completarTarea(_id)}
                >{estado ? 'Completa' : 'Incompleta'}</button>

            {admin && (
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm"
                    onClick={() => handleModalEliminarTarea(tarea)}
                >Eliminar</button>
            )}

        </div>

    </div>
  )
}

export default Tarea