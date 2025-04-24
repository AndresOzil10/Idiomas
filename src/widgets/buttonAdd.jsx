import { useState } from "react";
import Add from "../icons/new"
import UsersIcon from "../icons/users";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";

const AddButton = ({isOpen}) => { 
    const [isNewUser, setIsNewUser] = useState(false)
             
        const showNewUser = () => {
            setIsNewUser(true)
            isOpen(true)
        }

        const closeNewUser = () => {
            setIsNewUser(false)
            isOpen(false)
        }
    
    return <>
        <button className="btn btn-ghost" onClick={showNewUser}>
            <UsersIcon />
            <span>Users</span>
        </button>
        <dialog open={isNewUser} className="modal">
            <div className="modal-box border border-base-content bg-base-content/50 shadow-primary shadow-lg">
            <div className="overflow-x-auto bg-base-content/10 shadow-lg">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-action ml-3">
                    <button className="btn"><SaveIcon/></button>
                    <button className="btn" onClick={closeNewUser}><CloseIcon /></button>
                </div>
            </div>
        </dialog>
    </>
 }

 export default AddButton