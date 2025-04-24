import { useEffect, useState } from "react"
import Language from "../icons/language"
import Trash from "../icons/trash"
import Add from "../icons/new"
import SaveIcon from "../icons/saveIcon"
import EditIcon from "../icons/edit"
import CloseIcon from "../icons/close"
import { Form, Table, Typography, Popconfirm } from "antd"
import TableLevel from "./tableLevel"



const GroupButton = ({ isOpen }) => {
    const [isGroup, setIsGroup] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    

    const showGroups = () => {
        setIsGroup(true)
        isOpen(true)
    }

    const closeGroup = () => {
        setIsGroup(false)
        isOpen(false)
    }

    const showAdd = () => {
        setIsAdd(true)
    }

    const closeAdd = () => {
        setIsAdd(false)
    }

    return (
        <>
            <button className="btn btn-ghost" onClick={showGroups}>
                <Language />
                <span>Level</span>
            </button>
            <dialog open={isGroup} className="modal">
                <div className="modal-box w-11/12 max-w-7xl border border-base-content bg-base-content/50 shadow-lg shadow-primary"> {/* Increased max width */}
                    
                    <TableLevel />
                    <div className="modal-action">
                        <button className="btn bg-error-content/70" onClick={showAdd}>
                            <Add />
                        </button>
                        <dialog open={isAdd} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl bg-primary-300">
                                <h1 className="text-center">Add User</h1>
                                <div className="form-control mt-3">
                                    <label>Language:</label>
                                </div>
                                <select defaultValue="Pick a color" className="select w-full">
                                    <option disabled={true}>Pick a color</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                                <div className="form-control mt-3">
                                    <label>Level:</label>
                                </div>
                                <label className="input w-full">
                                    <Language />
                                    <input type="input" required placeholder="B1, A1, C2 ......" />
                                </label>
                                <div className="form-control mt-3">
                                    <label>Schedule:</label>
                                </div>
                                <div className="form-control text-center">
                                    <label className="text-xs">From:</label>
                                </div>
                                <input type="time" className="input mb-1 w-full" />
                                <div className="form-control text-center">
                                    <label className="text-xs">To:</label>
                                </div>
                                <input type="time" className="input w-full" />
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
                        <button className="btn bg-error-content/70" onClick={closeGroup}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                
            </dialog>
        </>
    )
}

export default GroupButton