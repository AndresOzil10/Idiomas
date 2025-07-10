import { useEffect, useState } from "react"
import logo from "../assets/images/kayser_logo.webp"
import LogoutIcon from "../icons/logoutIcon"
import UserIcon from "../icons/user"
import SaveIcon from "../icons/saveIcon"

const url = "http://localhost/API/idiomas/functions.php"

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

const TeacherScreen = () => { 
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        const Deleted = {
            "aksi": "getGroups",
            "id_teacher": "169"
        }
        const respuesta = await enviarData(url, Deleted)
        if (respuesta.estado === true) {
            setGroups(respuesta.data)
        } else {
            console.error("Error fetching groups:", respuesta.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // State to store checked members per group
    const [checkedMembers, setCheckedMembers] = useState({})

    // Handle checkbox change
    const handleCheckboxChange = (groupIndex, memberIndex) => {
        setCheckedMembers(prev => {
            const groupChecked = prev[groupIndex] || {}
            return {
                ...prev,
                [groupIndex]: {
                    ...groupChecked,
                    [memberIndex]: !groupChecked[memberIndex]
                }
            }
        })
    }

    // Handle Save button click
    const handleSave = async (groupIndex, groupLevel) => {
        const checked = checkedMembers[groupIndex] || {};
        const checkedMemberIndexes = Object.keys(checked).filter(idx => checked[idx])
        
        const checkedMembersList = checkedMemberIndexes.map(idx => groups[groupIndex].members[idx])
        // console.log("Saving members for group:", groupLevel)
        // console.log("Checked member objects:", checkedMembersList)
        const Asistencia = {
            "aksi": "Asistencia",
            "info": checkedMembersList,
            "grupo": groupLevel
        }
        const respuesta = await enviarData(url, Asistencia)
        if (respuesta.estado === true) {
            setGroups(respuesta.data)
        } else {
            console.error("Error fetching groups:", respuesta.message)
        }
    }

    const handleLogout = () => {
        // Clear session data (if any)
        sessionStorage.clear();
        localStorage.clear();
        // Redirect to login and prevent back navigation
        window.location.replace("/Idiomas");
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <img src={logo} alt="" width={150} height={150} />
                </div>
                <div className="navbar-end dropdown">
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <UserIcon />
                        </div>
                    </div>
                    <span className="mr-4">mx-asanchez</span>
                    <button className="btn btn-ghost btn-primary" onClick={handleLogout}>
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className="block justify-center mt-14">
                <h1 className="text-2xl font-bold text-center mb-4">Teacher Groups</h1>
                {groups.length > 0 ? (
                    groups.map((group, groupIndex) => (
                        <div className="collapse border-secondary border-2 mb-5" key={groupIndex}>
                            <input type="checkbox" />
                            <div className="collapse-title font-semibold text-center">{group.level + " " + group.schedule}</div>
                            <div className="collapse-content text-sm">
                                <div className="overflow-x-auto">
                                    <button
                                        className="btn btn-ghost btn-success ml-[92%]"
                                        onClick={() => handleSave(groupIndex, group.level)}
                                    >
                                        <SaveIcon/>Save
                                    </button>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>NN</th>
                                                <th>Name</th>
                                                <th>12/06/2025</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.members.map((member, memberIndex) => (
                                                <tr key={memberIndex}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                             <div>
                                                                <div className="font-bold">{member.nn}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {member.name}
                                                        <br />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox border-error-content bg-error-content checked:border-success-content checked:bg-success-content checked:text-base-100"
                                                            checked={
                                                                !!(
                                                                    checkedMembers[groupIndex] &&
                                                                    checkedMembers[groupIndex][memberIndex]
                                                                )
                                                            }
                                                            onChange={() => handleCheckboxChange(groupIndex, memberIndex)}
                                                        />
                                                    </td>
                                                    <th>
                                                        <button className="btn btn-ghost btn-xs">details</button>
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>NN</th>
                                                <th>Name</th>
                                                <th>12/06/2025</th>
                                                <th>Edit</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">No groups found</div>
                )}
            </div>
        </>
    )
}

export default TeacherScreen
