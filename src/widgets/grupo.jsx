import { useEffect, useState } from "react";
import Language from "../icons/language";
import Add from "../icons/new";
import SaveIcon from "../icons/saveIcon";
import CloseIcon from "../icons/close";
import Swal from "sweetalert2";
import EditIcon from "../icons/edit";
import Trash from "../icons/trash";

import { Form, Table, Pagination } from "antd";

const url_add = "http://10.144.13.5/API/idiomas/functions.php";

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

const GroupTest = () => {
    const [isAdd, setIsAdd] = useState(false);
    const [isLanguage, setIsLanguage] = useState([]);
    const [group, setGroup] = useState([])
    const [isTeacher, setIsTeacher] = useState([])
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");
    const [schedule, setSchedule] = useState("");
    const [from, setFrom] = useState("");
    const [days, setDays] = useState("");
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [updatedLevel, setUpdatedLevel] = useState("")
    const [updatedSchedule, setUpdatedSchedule] = useState("")
    const [updatedDays, setUpdatedDays] = useState("")
    const [showRowModal, setShowRowModal] = useState(false)
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10 // Número de registros por página

    const setData = async () => {
        const Language = {
            "aksi": "getLanguages"
        };
        const response = await enviarData(url_add, Language);
        const data = await response.data;
        setIsLanguage(data);
    }

    const fetchData = async () => {
        const Groups = {
            "aksi": "getGroupsList"
        }
        const response = await enviarData(url_add, Groups)
        const data = await response.data
        setGroup(data)
    }

    const getTeacher = async () => {
        const Teacher = {
            "aksi": "getTeachers"
        }
        const response = await enviarData(url_add, Teacher)
        const data = await response.data
        setIsTeacher(data)
    }

    useEffect(() => {
        fetchData()
        setData()
        getTeacher()
    }, [])

    const deleteLanguage = async (key) => {
        const Deleted = {
            "aksi": "deletedGroup",
            "id": key,
        };
        const respuesta = await enviarData(url_add, Deleted);
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
            fetchData(); // Actualiza la lista después de eliminar
        }
    }

    const showAdd = () => {
        setIsAdd(true)
    }

    const closeAdd = () => {
        setIsAdd(false)
    }

    const closeGroup = () => {
        // Implementa la lógica para cerrar el grupo si es necesario
    }

    const handleAddGroup = async () => {
        setIsLoading(true)
        // Validación de campos
        // ...
        const newGroupAdd = {
            "aksi": "addGroup",
            "language": language,
            "level": level,
            "schedule": schedule,
            "from": from,
            "days": days,
        }

        const respuesta = await enviarData(url_add, newGroupAdd);
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
            fetchData() // Actualiza la lista después de agregar
        }
        // Reiniciar campos
        setIsLoading(false)
    }

    const saveChanges = async () => {
        // console.log(updateLanguage, updateCost)
        const updateLevelData = {
          "aksi": "UpdateLevel",
          "id": selectedRow.id,
          "level": updatedLevel,
          "schedule": updatedSchedule,
          "days": updatedDays,
        }
    
        const respuesta = await enviarData(url_add, updateLevelData)
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
          
          setShowRowModal(false)
          fetchData()
        }
      }

    // Calcular los datos de la página actual
    const paginatedData = group.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (
        <>
            <div className="overflow-x-auto rounded-box shadow-lg">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Language</th>
                                <th>Level</th>
                                <th>Schedule</th>
                                <th>Days</th>
                                <th>Teacher</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.language}</td>
                                    <td>{item.level}</td>
                                    <td>{item.schedule}</td>
                                    <td>{item.days}</td>
                                    <td>{item.teacher}</td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-primary"
                                            onClick={() => {
                                              setShowRowModal(true)
                                              setSelectedRow(item)
                                              setSelectedLanguage(item.language)// Establece el valor actual
                                              setUpdatedLevel(item.level) // Establece el valor actual
                                              setUpdatedSchedule(item.schedule)
                                              setUpdatedDays(item.days) // Establece el valor actual
                                                // Aquí puedes implementar la lógica para editar
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
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={group.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                style={{ marginTop: '16px', textAlign: 'right' }}
            />
            <div className="modal-action">
                <button className="btn btn-primary" onClick={showAdd}>
                    <Add />
                </button>
                <dialog open={isAdd} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl bg-primary-300">
                        <h1 className="text-center">Add User</h1>
                        <div className="form-control mt-3">
                            <label>Language:</label>
                        </div>
                        <select
                            className="select w-full"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option disabled={true} value="">
                                Pick a language
                            </option>
                            {isLanguage && isLanguage.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.language}
                                </option>
                            ))}
                        </select>
                        <div className="form-control mt-3">
                            <label>Level:</label>
                        </div>
                        <label className="input w-full">
                            <Language />
                            <input type="input" required placeholder="B1, A1, C2 ......" value={level} onChange={(e) => setLevel(e.target.value)} />
                        </label>
                        <div className="form-control mt-3">
                            <label>Days:</label>
                        </div>
                        <label className="input w-full">
                            <Language />
                            <input type="input" required placeholder="Monday-Thursday" value={days} onChange={(e) => setDays(e.target.value)} />
                        </label>
                        <div className="form-control mt-3">
                            <label>Schedule:</label>
                        </div>
                        <div className="form-control text-center">
                            <label className="text-xs">From:</label>
                        </div>
                        <input type="time" className="input mb-1 w-full" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                        <div className="form-control text-center">
                            <label className="text-xs">To:</label>
                        </div>
                        <input type="time" className="input w-full" value={from} onChange={(e) => setFrom(e.target.value)} />
                        <div className="form-control mt-3">
                            <label>Teacher:</label>
                        </div>
                        <select
                            className="select w-full"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option disabled={true} value="">
                                Pick a teacher
                            </option>
                            {isTeacher && isTeacher.map((teach) => (
                                <option key={teach.id} value={teach.id}>
                                    {teach.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="modal-action ml-3">
                            <button
                                className="btn bg-accent"
                                onClick={handleAddGroup}
                                disabled={isLoading}
                            >
                                {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
                            </button>
                            <button className="btn bg-error" onClick={closeAdd}>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                </dialog>
                <button className="btn btn-error" onClick={closeGroup}>
                    <CloseIcon />
                </button>
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
                        <p><strong>Language:</strong> {selectedRow.language}</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Level:</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Level"
                            value={updatedLevel}
                            onChange={(e) => setUpdatedLevel(e.target.value)} // Actualiza el estado
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Schedule:</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Schedule"
                            value={updatedSchedule}
                            onChange={(e) => setUpdatedSchedule(e.target.value)} // Actualiza el estado
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Days:</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Days"
                            value={updatedDays}
                            onChange={(e) => setUpdatedDays(e.target.value)} // Actualiza el estado
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
        </>
    );
}

export default GroupTest;
