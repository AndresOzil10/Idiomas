import { useState } from "react";
import Add from "../icons/new"
import UsersIcon from "../icons/users";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import TableUsers from "./tableUsers";

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
        <button className="btn btn-ghost rounded-full btn-error" onClick={showNewUser}>
            <UsersIcon />
            <span>Users</span>
        </button>
        <dialog open={isNewUser} className="modal">
            <div className="modal-box border border-base-content bg-base-content/50 shadow-primary shadow-lg">
                <div className="overflow-x-auto bg-base-content/10 shadow-lg">
                    <TableUsers />
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