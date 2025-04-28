import { useState } from "react";
import Add from "../icons/new"
import UsersIcon from "../icons/users";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import TableUsers from "./tableUsers";

const AddButton = ({isOpen}) => { 
    const [isNewUser, setIsNewUser] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
             
        const showNewUser = () => {
            setIsNewUser(true)
            isOpen(true)
        }

        const closeNewUser = () => {
            setIsNewUser(false)
            isOpen(false)
        }

        const showAdd = () => {
            setIsAdd(true)
        }
    
        const closeAdd = () => {
            setIsAdd(false)
        }
    
    return <>
        <button className="btn btn-ghost rounded-full btn-error" onClick={showNewUser}>
            <UsersIcon />
            <span>Users</span>
        </button>
        <dialog open={isNewUser} className="modal">
            <div className="modal-box w-11/12 max-w-7xl h-[400px] border border-base-content bg-base-content/50 shadow-primary shadow-lg">
                <div className="overflow-x-auto bg-base-content/10 shadow-lg">
                    <TableUsers />
                </div>
                <div className="modal-action ml-3">
                    <button className="btn" onClick={showAdd}><Add/></button>
                    <dialog open={isAdd} className="modal">
                        <div className="modal-box w-1/4 max-w-5xl bg-primary-300">
                            <h1 className="text-center">Add User</h1>
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Username:</legend>
                                    <input type="text" className="input" placeholder="My awesome page" />
                                </fieldset>
                            </div>
                            
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Password:</legend>
                                    <input type="text" className="input" placeholder="My awesome page" />
                                </fieldset>
                            </div>
                            <div className="form-control mt-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Nombre:</legend>
                                    <input type="text" className="input" placeholder="My awesome page" />
                                </fieldset>
                            </div>
                            <div className="modal-action ml-3">
                                <button className="btn bg-error-content/70">
                                    <SaveIcon />
                                </button>
                                <button className="btn bg-error-content/70" onClick={closeAdd}>
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </dialog>
                    <button className="btn" onClick={closeNewUser}><CloseIcon /></button>
                </div>
            </div>
        </dialog>
    </>
 }

 export default AddButton