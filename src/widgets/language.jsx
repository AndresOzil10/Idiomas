import { useEffect, useState } from "react"
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd"
import Trash from "../icons/trash" // Asegúrate de que esta ruta sea correcta
import EditIcon from "../icons/edit"
import Add from "../icons/new"
import CloseIcon from "../icons/close"
import SaveIcon from "../icons/saveIcon"
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

const LanguageS = () => {

    const [isLanguage, setIsLanguage] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
      const [language, setLanguage] = useState([]);
      const [form] = Form.useForm();
      const [isLoading, setIsLoading] = useState(false)

    const setData = async () => {
    const Languages = {
            "aksi": "getLanguages"
        }
        const response = await enviarData(url_add, Languages)
        // console.log(response.data)
        const data = await response.data
    setLanguage(data);
    }

    useEffect(() => {
        if (!isAdd) {
          setData(); // Actualizar la tabla cuando se cierre el modal de agregar
        }
      }, [isAdd]);
    
    
      const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...language];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setLanguage(newData);
            setEditingKey('');
          } else {
            newData.push({ key: Date.now(), ...row }); // Ensure new items have a unique key
            setLanguage(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      }
    
      const deleteLanguage = async (key) => {
        // console.log(key);
    
        const Deleted = {
          "aksi": "deletedLanguage",
          "id": key,
        }
        //console.log(newLanguageData)
        const respuesta = await enviarData(url_add, Deleted)
          if(respuesta.error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respuesta.error,
              });
          }
          Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: respuesta.success,
          })
        
      }
    
    //   const showLanguages = () => {
    //     setIsLanguage(true);
    //     isOpen(true);
    //   }
    
      const closeLanguage = () => {
        setIsLanguage(false);
        isOpen(false);
      }
    
      const showAdd = () => {
        setIsAdd(true);
      }
    
      const closeAdd = () => {
        setIsAdd(false);
      }
    
      const [newLanguage, setNewLanguage] = useState('');
      const [newCost, setNewCost] = useState('');
    
      const handleAddLanguage = async () => {
        setIsLoading(true)
        if (newLanguage === '' || newCost === '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields',
          });
          setIsLoading(false)
          return
        }
    
        const newLanguageData = {
          "aksi": "addLanguage",
          "language": newLanguage,
          "costxclass": newCost,
        }
    
        const respuesta = await enviarData(url_add, newLanguageData)
        if(respuesta.error){
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: respuesta.error,
            });
        }
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: respuesta.success,
        })
        setNewLanguage('')
        setNewCost('')
        setIsLoading(false)
      }

    return (
    <>
      {/* <button className="btn btn-ghost rounded-full btn-error" onClick={showLanguages}>
        <Language />
        <span>Language</span>
      </button> */}
      {/* <dialog open={isLanguage} className="modal"> */}
        {/* <div className="modal-box w-11/12 max-w-5xl border border-base-content bg-base-100 shadow-lg shadow-primary"> */}
          <div className="overflow-x-auto rounded-box shadow-lg">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
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
                        <button className="btn btn-ghost btn-error">
                            <Trash />
                        </button>
                        <button className="btn btn-ghost btn-primary" onClick={() => save(item.id)}>
                          <SaveIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Language</th>
                    <th>Cost x Class</th>
                    <th>Options</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="modal-action ">
            <button className="btn bg-primary" onClick={showAdd}><Add /></button>
            <dialog open={isAdd} className="modal">
              <div className="modal-box ">
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
                    <legend className="fieldset-legend">Cost per Hour:</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Cost per Hour"
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
            <button className="btn bg-error" onClick={closeLanguage}><CloseIcon /></button>
          </div>
        {/* </div> */}
      {/* </dialog> */}
    </>
  )
}

export default LanguageS