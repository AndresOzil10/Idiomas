import { useEffect, useState } from "react";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
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

const StudentAdd = () => { 
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [nameOptions, setNameOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [nn, setNN] = useState("");
  const [idioma, setIdioma] = useState("");
  const [grupo, setGru] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const fetchStudents = async () => {
    const response = await enviarData(url_add, { "aksi": "getStudents" });
    setNameOptions(response.data)
  }

    const fetchLanguages = async () => {
        const response = await enviarData(url_add, { "aksi": "getLanguages" });
        setLanguageOptions(response.data)
    }

    const fetchGroups = async () => {
        const response = await enviarData(url_add, { "aksi": "getGroupsList" });
        setGroupOptions(response.data)
    }

    useEffect(() => {
        fetchStudents()
        fetchLanguages()
        fetchGroups()
    }, [])


    const resetForm = () => {
        setNN('');
        setIdioma('');
        setGru('');
    }

    const handleSave = async () => {
        setIsLoading(true)
        const newStudent = {
        "aksi": "addNewStudent",
        "nomina": nn,
        "language": idioma,
        "grupo": grupo,
        }

        try {
        const respuesta = await enviarData(url_add, newStudent);
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
            resetForm(); // Limpiar campos después de que se cierre la alerta
        }
        } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
        })
        } finally {
        setIsLoading(false);
        }
  }

  return (
    <>
      <div className="flex justify-center mb-3 mt-2">
        <div className="badge badge-secondary font-bold">Add Student</div>
      </div>
      <div className="auth-form mb-1">
        <label className="text-secondary-content">Name:</label>
      </div>
      <select className="select w-full" onChange={(e) => setNN(e.target.value)} value={nn}>
        <option value="">Pick a name</option>
        {nameOptions.map((n, index) => (
          <option key={index} value={n.nomina}>{`${n.nomina} ${n.nombre}`}</option>
        ))}
      </select>
      <div className="auth-form mb-1 mt-3">
        <label className="text-secondary-content">Language:</label>
      </div>
      <select className="select w-full" onChange={(e) => setIdioma(e.target.value)} value={idioma}>
        <option value="">Pick a language</option>
        {languageOptions.map((lang, index) => (
          <option key={index} value={lang.id}>{lang.language}</option>
        ))}
      </select>
      <div className="auth-form mb-1 mt-3">
        <label className="text-secondary-content">Group:</label>
      </div>
      <select className="select w-full" onChange={(e) => setGru(e.target.value)} value={grupo}>
        <option value="">Pick a group</option>
        {groupOptions.map((grp, index) => (
          <option key={index} value={grp.id}>{`${grp.level} ${grp.schedule} ${grp.days}`}</option>
        ))}
      </select>
      <div className="modal-action ml-3">
        <button className="btn bg-accent" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
        </button>
      </div>
    </>
  )
}

export default StudentAdd;
