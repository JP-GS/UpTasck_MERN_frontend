import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import ModalFormularioTarea from '../Components/ModalFormularioTarea';
import ModalEliminarTarea from '../Components/ModalEliminarTarea';
import ModalEliminarColaborador from '../Components/ModalEliminarColaborador';
import Tarea from '../Components/Tarea';
import Colaborador from '../Components/Colaborador';
import  io  from 'socket.io-client';

let socket;

const Proyecto = () => {

  const params = useParams();
  const 
  { 
    obtenerProyecto, 
    proyecto, 
    cargando, 
    handleModalTarea, 
    submitTareasProyecto, 
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea 
  } = useProyectos();

  const admin = useAdmin()

  useEffect(() => {

    obtenerProyecto(params.id)
    
  }, []);

  useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL)
      socket.emit('abrir proyecto', params.id)
  }, [])

  useEffect(() => {
      socket.on('tarea agregada', tareaNueva => {
        if(tareaNueva.proyecto === proyecto._id) {
          submitTareasProyecto(tareaNueva)
        }
      })

      socket.on('tarea eliminada', tareaEliminada => {
        if(tareaEliminada.proyecto === proyecto._id) {
          eliminarTareaProyecto(tareaEliminada)
        }
      })
      socket.on('tarea actualizada', tareaActualizada => {
        if(tareaActualizada.proyecto._id === proyecto._id) {
          actualizarTareaProyecto(tareaActualizada)
        }
      })
      socket.on('nuevo estado', nuevoEstadoTarea => {
        if(nuevoEstadoTarea.proyecto._id === proyecto._id) {
          cambiarEstadoTarea(nuevoEstadoTarea)
        }
      })       
  })

  const { nombre } = proyecto;

  if(cargando) return 'Cargando...'
  
  return ( 
      <>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-black'>{nombre}</h1>

          {admin && (          
            <div className='flex items-center text-gray-400 gap-2 hover:text-black hover:cursor-pointer'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>

              <Link
              to={`/proyectos/editar/${params.id}`}
              className='uppercase font-bold'
              >Editar</Link>
            </div>
          )}
        </div>

        {admin && (
          <button 
            onClick={ handleModalTarea }
            type='button'
            className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center hover:bg-sky-700'
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            
            Nueva Tarea
          </button>
        )}

        <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

        <div className="bg-white rounded-lg shadow mt-10">
          {proyecto.tareas?.length ? 
            proyecto.tareas?.map(tarea => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
              />
            )) : 
            <p className='text-center my-5 p-10'>Este Proyecto aún no tiene Tareas</p>}
        </div>

        {admin && (
          <>
            <div className="flex justify-between items-center mt-10">
              <p className='font-bold text-xl mt-10'>Colaboradores</p>
              
              <div className='flex justify-between items-center gap-2 text-gray-400 uppercase hover:text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className='font-bold'
              >Añadir</Link>
              </div>  
            </div>

            <div className="bg-white rounded-lg shadow mt-10">
              {proyecto.colaboradores?.length ? 
                proyecto.colaboradores?.map(colaborador => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                )) : 
                <p className='text-center my-5 p-10'>Este Proyecto aún no tiene Colaboradores</p>}
            </div>
          </>
        )}

        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />
      </>
    )
}

export default Proyecto