import { useEffect, useState } from "react"
import Add from "../icons/new"
import CloseIcon from "../icons/close"
import SaveIcon from "../icons/saveIcon"
import Swal from "sweetalert2"

const url_add = "http://10.144.13.5/API/idiomas/functions.php"

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

const StudentAdd = () => { 

     const [isNewStudent, setIsNewStudent] = useState(false)
        const [name, setName] = useState("")
        const [language, setLanguage] = useState("")
        const [group, setGroup] = useState("")
        const [nn, setNN] = useState("")
        const [idioma, setIdioma] = useState("")
        const [grupo, setGru] = useState("")
        const [isLoading, setIsLoading] = useState(false)
    
        
    
        const setStudent = async () => {
            const Students = {
                "aksi": "getStudents"
            }
            const response = await enviarData(url_add, Students)
            // console.log(response.data)
            const data = await response.data
            setName(data)
        }
    
        const setLang = async () => {
            const Idiomas = {
                "aksi": "getLanguages"
            }
            const response = await enviarData(url_add, Idiomas)
            const data = await response.data
            setLanguage(data)
        }
    
        const setGrupo = async () => {
            const Groups = {
                "aksi": "getGroupsList"
            }
            const response = await enviarData(url_add, Groups)
            const data = await response.data
            setGroup(data)
        }
    
        useEffect(() => {
            setStudent()
            setLang()
            setGrupo()
        })
             
        const showStudent = () => {
            setIsNewStudent(true)
            isOpen(true)
        }
    
        const closeStudents = () => {
            setIsNewStudent(false)
            isOpen(false)
        }
    
        const handleNameChange = (e) => {
            setNN(e.target.value);
        }
    
        const handleLanguageChange = (e) => {
            setIdioma(e.target.value);
        }
    
        const handleGroupChange = (e) => {
            setGru(e.target.value);
        }
    
        const Save = async () => {
            setIsLoading(true)
            const newStudent = {
                "aksi": "addNewStudent",
                "nomina": nn,
                "language": idioma,
                "grupo": grupo,
              }
              
            const respuesta = await enviarData(url_add, newStudent)
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
            setIdioma('')
            setGru('')
            setNN('')
            setIsLoading(false)
        }
    
    return (
        <>
            <div className="flex justify-center mb-3 mt-2">
                    <div className="badge badge-secondary font-bold">Add Student</div>
                </div>
                <div className="auth-form mb-1">
                    <label className="text-secondary-content">Name:</label>
                </div>
                <select className="select w-full" onChange={handleNameChange} value={nn} >
                    <option>Pick a name</option>
                    {name && name.map((n, index) => (
                        <option key={index} value={n.nomina}>{n.nomina+" "+n.nombre}</option>
                    ))}
                </select>
                <div className="auth-form mb-1 mt-3">
                    <label className="text-secondary-content">Language:</label>
                </div>
                <select className="select w-full" onChange={handleLanguageChange} value={idioma}>
                    <option>Pick a language</option>
                    {language && language.map((lang, index) => (
                        <option key={index} value={lang.id}>{lang.language}</option>
                    ))}
                </select>
                <div className="auth-form mb-1 mt-3">
                    <label className="text-secondary-content">Group:</label>
                </div>
                <select className="select w-full" onChange={handleGroupChange} value={grupo}>
                    <option>Pick a group</option>
                    {group && group.map((grp, index) => (
                        <option key={index} value={grp.id}>{grp.level+" "+grp.schedule+" "+grp.days}</option>
                    ))}
                </select>
                <div className="modal-action ml-3">
                    <button className="btn bg-accent" onClick={Save} disabled={isLoading}>
                        {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
                    </button>
                    <button className="btn btn-secondary" onClick={closeStudents}><CloseIcon /></button>
                </div>
        </>
    )
 }

 export default StudentAdd