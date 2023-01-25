import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {

  const {handleModalEliminarColaborador, modalEliminarColaborador} =useProyectos();

  const {nombre, email} = colaborador
  return (
    <div className="flex justify-between items-center p-5 border-b">

      <div>
        <p className="font-bold text-gray-900">{nombre}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div>
    <button
      type="button"
      className="bg-red-600 rounded-lg text-sm px-4 py-3 uppercase text-white font-bold"  
      onClick={() => handleModalEliminarColaborador(colaborador)}  
    >Eliminar</button>
      </div>
    </div>
  )
}

export default Colaborador