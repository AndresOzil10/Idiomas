import { useState } from "react"
import Add from "../icons/new"
import UsersIcon from "../icons/users"
import CloseIcon from "../icons/close"
import SaveIcon from "../icons/saveIcon"
import TableUsers from "./tableUsers"
import Swal from "sweetalert2"

const url_add = "http://localhost/API/idiomas/functions.php"

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type' : 'application/json'
      }
  })
  const json = await resp.json()

  return  json
}

const AddButton = ({isOpen}) => { 
    const [isNewUser, setIsNewUser] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [user, setUser] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
             
        const showNewUser = () => {
            setIsNewUser(true)
            isOpen(true)
        }

        const closeNewUser = () => {
            setIsNewUser(false)
            isOpen(false)
        }

        const showAdd = () => {
            setIsAdd(true)
        }
    
        const closeAdd = () => {
            setIsAdd(false)
        }

        const handleChangeUser = (e) => {
            setUser(e.target.value)
        }

        const handleChangePassword = (e) => {
            setNewPassword(e.target.value)
        }

        const handleChangeName = (e) => {
            setNewName(e.target.value)
        }

    const handleAddTeacherUser = async () => {
        setIsLoading(true);
        
        if(user === '' || newPassword === '' || newName === '') {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields',
            });
            setIsLoading(false);
            return;
        }

        const newTeacherUser = {
            "aksi": "addTeacherUser",
            "user": user,
            "password": newPassword,
            "name": newName,
        }

        try {
            const respuesta = await enviarData(url_add, newTeacherUser);
            
            if(respuesta.error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respuesta.error,
            });
            setIsLoading(false);
            return;
            }

            await Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: respuesta.success,
            });

            // Limpiar campos después de que se cierre la alerta
            setNewName('');
            setUser('');
            setNewPassword('');
            
        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    return <>
        <button className="btn btn-ghost rounded-full btn-error" onClick={showNewUser}>
            <UsersIcon />
            <span>Users</span>
        </button>
        <dialog open={isNewUser} className="modal">
            <div className="modal-box w-11/12 max-w-5xl border border-base-content bg-base-100 shadow-primary shadow-lg">
                <div className="overflow-x-auto shadow-lg">
                    <TableUsers />
                </div>
                <div className="modal-action ml-3">
                    <button className="btn btn-primary" onClick={showAdd}><Add/></button>
                    <dialog open={isAdd} className="modal">
                        <div className="modal-box w-1/4 max-w-5xl bg-primary-300">
                            <h1 className="text-center">Add User</h1>
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Username:</legend>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder="My awesome page" 
                                        value={user}
                                        onChange={handleChangeUser} 
                                    />
                                </fieldset>
                            </div>
                            
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Password:</legend>
                                    <input type="text" className="input" placeholder="My awesome page" 
                                    value={newPassword} onChange={handleChangePassword} />
                                </fieldset>
                            </div>
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Nombre:</legend>
                                    <input type="text" className="input" placeholder="My awesome page" value={newName} onChange={handleChangeName} />
                                </fieldset>
                            </div>
                            <div className="modal-action ml-3">
                                <button 
                                    className="btn bg-accent" 
                                    onClick={handleAddTeacherUser} 
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
                                </button>
                                <button className="btn bg-secondary" onClick={closeAdd}>
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </dialog>
                    <button className="btn btn-error" onClick={closeNewUser}><CloseIcon /></button>
                </div>
            </div>
        </dialog>
    </>
 }

 export default AddButton