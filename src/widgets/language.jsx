import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import Trash from "../icons/trash"; // Asegúrate de que esta ruta sea correcta
import EditIcon from "../icons/edit";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import Swal from "sweetalert2";

const url_add = "http://localhost/API/idiomas/functions.php";

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await resp.json();
  return json;
}

const LanguageS = () => {
  const [isLanguage, setIsLanguage] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [language, setLanguage] = useState([])
  const [showRowModal, setShowRowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newLanguage, setNewLanguage] = useState('')
  const [updateLanguage, setUpdateLanguage] = useState('')
  const [updateCost, setUpdateCost] = useState('')
  const [newCost, setNewCost] = useState('')

  const setData = async () => {
    const Languages = {
      "aksi": "getLanguages"
    };
    const response = await enviarData(url_add, Languages);
    const data = await response.data;
    setLanguage(data);
  }

  useEffect(() => {
    setData()
  }, [])

  const deleteLanguage = async (key) => {
    const Deleted = {
      "aksi": "deletedLanguage",
      "id": key,
    }
    const respuesta = await enviarData(url_add, Deleted);
    if (respuesta.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: respuesta.error,
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: respuesta.success,
      })
      setData() // Actualiza la lista después de eliminar
    }
  }

  const closeLanguage = () => {
    setIsLanguage(false)
  }

  const showAdd = () => {
    setIsAdd(true)
  }

  const closeAdd = () => {
    setIsAdd(false)
  }

  const handleAddLanguage = async () => {
    setIsLoading(true);
    if (newLanguage === '' || newCost === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      });
      setIsLoading(false);
      return;
    }

    const newLanguageData = {
      "aksi": "addLanguage",
      "language": newLanguage,
      "costxclass": newCost,
    };

    const respuesta = await enviarData(url_add, newLanguageData);
    if (respuesta.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: respuesta.error,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: respuesta.success,
      });
      setData(); // Actualiza la lista después de agregar
    }
    setNewLanguage('');
    setNewCost('');
    setIsLoading(false);
  }

  const saveChanges = async () => {
    // console.log(updateLanguage, updateCost)
    const updatedLanguageData = {
      "aksi": "updateLanguage",
      "id": selectedRow.id,
      "language": updateLanguage,
      "costxclass": updateCost,
    }

    const respuesta = await enviarData(url_add, updatedLanguageData)
      if (respuesta.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: respuesta.error,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: respuesta.success,
        })
        setData() // Actualiza la lista después de editar
        setShowRowModal(false)// Cierra el modal
      }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box shadow-lg">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Language</th>
                <th>Cost x Class</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {language.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.language}</td>
                  <td>{item.costxclass}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-primary"
                      onClick={() => {
                        setSelectedRow(item)
                        setUpdateLanguage(item.language) // Establece el valor actual
                        setUpdateCost(item.costxclass) // Establece el valor actual
                        setShowRowModal(true)
                      }}
                    >
                      <EditIcon />
                    </button>
                    <button className="btn btn-ghost btn-error" onClick={() => deleteLanguage(item.id)}>
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para editar el idioma */}
      {showRowModal && selectedRow && (
        <dialog open={showRowModal} className="modal">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Language Details</h2>
            <fieldset className="fieldset">
              <p><strong>Id:</strong> {selectedRow.id}</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Language:</legend>
              <input
                type="text"
                className="input"
                placeholder="Language"
                value={updateLanguage}
                onChange={(e) => setUpdateLanguage(e.target.value)} // Actualiza el estado
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cost x Class:</legend>
              <input
                type="text"
                className="input"
                placeholder="Cost per Class"
                value={updateCost}
                onChange={(e) => setUpdateCost(e.target.value)} // Actualiza el estado
              />
            </fieldset>
            <div className="modal-action">
              <button
                className="btn bg-success"
                onClick={saveChanges} // Llama a la función para guardar cambios
              >
                <SaveIcon />
              </button>
              <button
                className="btn bg-error"
                onClick={() => setShowRowModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Botón para agregar un nuevo idioma */}
      <div className="modal-action">
        <button className="btn bg-primary" onClick={showAdd}><Add /></button>
        <dialog open={isAdd} className="modal">
          <div className="modal-box">
            <h1 className="text-center">Add Language</h1>
            <div className="form-control mt-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Language:</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Language"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Cost per Class:</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Cost per Class"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="modal-action ml-3">
              <button
                className="btn bg-accent"
                onClick={handleAddLanguage}
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
              </button>
              <button className="btn bg-error" onClick={closeAdd}><CloseIcon /></button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default LanguageS;
