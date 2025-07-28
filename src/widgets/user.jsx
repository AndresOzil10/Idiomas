import { useState } from "react";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import TableUsers from "./tableUsers";
import Swal from "sweetalert2";

const url_add = "http://10.144.13.5/API/idiomas/functions.php";

const enviarData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await resp.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

const UserScreen = () => { 
  const [isAdd, setIsAdd] = useState(false);
  const [user, setUser ] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showAdd = () => {
    setIsAdd(true);
  }

  const closeAdd = () => {
    setIsAdd(false);
    resetForm();
  }

  const resetForm = () => {
    setUser ('');
    setNewPassword('');
    setNewName('');
  }

  const handleChangeUser  = (e) => {
    setUser (e.target.value);
  }

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleAddTeacherUser  = async () => {
    setIsLoading(true);
    
    if (!user || !newPassword || !newName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      });
      setIsLoading(false);
      return;
    }

    const newTeacherUser  = {
      "aksi": "addTeacherUser ",
      "user": user,
      "password": newPassword,
      "name": newName,
    }

    try {
      const respuesta = await enviarData(url_add, newTeacherUser );
      
      if (respuesta.error) {
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

      resetForm(); // Limpiar campos después de que se cierre la alerta

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

  return (
    <>
      <div className="overflow-x-auto shadow-lg">
        <TableUsers />
      </div>
      <div className="modal-action ml-3">
        <button className="btn btn-primary" onClick={showAdd}><Add /></button>
        <dialog open={isAdd} className="modal">
          <div className="modal-box w-1/4 max-w-5xl bg-primary-300">
            <h1 className="text-center">Add User</h1>
            <div className="form-control mt-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Username:</legend>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter username" 
                  value={user}
                  onChange={handleChangeUser } 
                />
              </fieldset>
            </div>
            <div className="form-control mt-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password:</legend>
                <input 
                  type="password" 
                  className="input" 
                  placeholder="Enter password" 
                  value={newPassword} 
                  onChange={handleChangePassword} 
                />
              </fieldset>
            </div>
            <div className="form-control mt-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name:</legend>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter name" 
                  value={newName} 
                  onChange={handleChangeName} 
                />
              </fieldset>
            </div>
            <div className="modal-action ml-3">
              <button 
                className="btn bg-accent" 
                onClick={handleAddTeacherUser } 
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
      </div>
    </>
  );
}

export default UserScreen;
