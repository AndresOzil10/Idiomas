import { useEffect, useState } from "react";
import logo from "../assets/images/kayser_logo.webp";
import LogoutIcon from "../icons/logoutIcon";
import UserIcon from "../icons/user";

const url = "http://localhost/API/idiomas/functions.php";

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
        };
        const respuesta = await enviarData(url, Deleted);
        if (respuesta.estado === true) {
            setGroups(respuesta.data);
        } else {
            console.error("Error fetching groups:", respuesta.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                    <button className="btn btn-ghost btn-primary">
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className="block justify-center mt-14">
                <h1 className="text-2xl font-bold text-center mb-4">Teacher Groups</h1>
                {groups.length > 0 ? (
                    groups.map((group, index) => (
                        <div className="collapse bg-secondary mb-5" key={index}>
                            <input type="checkbox" />
                            <div className="collapse-title font-semibold">{group.level + " " + group.schedule}</div>
                            <div className="collapse-content text-sm">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>NN</th>
                                                <th>Name</th>
                                                <th></th>
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
                                                        className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
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
                                                <th></th>
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
    );
}

export default TeacherScreen;
