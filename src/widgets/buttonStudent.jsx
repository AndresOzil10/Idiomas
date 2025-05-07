import { useEffect, useState } from "react";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import { Input } from "@heroui/react";
import SaveIcon from "../icons/saveIcon";

const StudentButton = ({isOpen}) => { 

    const [isNewStudent, setIsNewStudent] = useState(false)
    const [name, setName] = useState("")
    const [language, setLanguage] = useState("")
    const [group, setGroup] = useState("")
    const [nn, setNN] = useState("")
    const [idioma, setIdioma] = useState("")
    const [grupo, setGru] = useState("")

    const url_login = "http://localhost/API/idiomas/"

    const setStudent = async () => {
        const response = await fetch(url_login+"students.php")
        const data = await response.json()
        setName(data)
    }

    const setLang = async () => {
        const response = await fetch(url_login+"idioma.php")
        const data = await response.json()
        setLanguage(data)
    }

    const setGrupo = async () => {
        const response = await fetch(url_login+"groups.php")
        const data = await response.json()
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
    };

    const handleLanguageChange = (e) => {
        setIdioma(e.target.value);
    };

    const handleGroupChange = (e) => {
        setGru(e.target.value);
    };

    const Save = () => {
        console.log(nn, idioma, grupo)
    }


    return <>
        <button className="btn btn-ghost rounded-full btn-error" onClick={showStudent}>
            <Add />
            <span>Add New Student </span>
        </button>
        <dialog open={isNewStudent} className="modal">
            <div className="modal-box border border-base-content bg-base-100 shadow-lg shadow-primary">
                <div className="flex justify-center mb-3 mt-2">
                    <div className="badge badge-secondary font-bold">Add Student</div>
                </div>
                <div className="auth-form mb-1">
                    <label className="text-secondary-content">Name:</label>
                </div>
                <select defaultValue="Pick a name" className="select w-full" onChange={handleNameChange}>
                    <option disabled={true}>Pick a name</option>
                    {name && name.map((n, index) => (
                        <option key={index} value={n.nomina}>{n.nomina+" "+n.nombre}</option>
                    ))}
                </select>
                <div className="auth-form mb-1 mt-3">
                    <label className="text-secondary-content">Language:</label>
                </div>
                <select defaultValue="Pick a language" className="select w-full" onChange={handleLanguageChange}>
                    <option disabled={true}>Pick a language</option>
                    {language && language.map((lang, index) => (
                        <option key={index} value={lang.id}>{lang.language}</option>
                    ))}
                </select>
                <div className="auth-form mb-1 mt-3">
                    <label className="text-secondary-content">Group:</label>
                </div>
                <select defaultValue="Pick a group" className="select w-full" onChange={handleGroupChange}>
                    <option disabled={true}>Pick a group</option>
                    {group && group.map((grp, index) => (
                        <option key={index} value={grp.id}>{grp.level+" "+grp.schedule+" "+grp.days}</option>
                    ))}
                </select>
                <div className="modal-action ml-3">
                    <button className="btn btn-accent" onClick={Save}><SaveIcon/></button>
                    <button className="btn btn-secondary" onClick={closeStudents}><CloseIcon /></button>
                </div>
            </div>
        </dialog>
    </>
 }

 export default StudentButton