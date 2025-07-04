import { useState } from "react"
import logo from "../assets/images/kayser_logo.webp"
import LogoutIcon from "../icons/logoutIcon"
import UserIcon from "../icons/user"
import Language from "../icons/language"
import LanguageS from "../widgets/language"
import GroupTest from "../widgets/grupo"
import StudentAdd from "../widgets/student"
import UsersIcon from "../icons/users"
import Add from "../icons/new"
import UserScreen from "../widgets/user"
import InfoTarjet from "../widgets/infoTarjet"
import Graphycs from "../widgets/graphycs"
import BarGraphycs from "../widgets/bargraphycs"
import TableInfo from "../widgets/tableInfo"


const ScreenHome = () => { 
    const [modalOpen, setModalOpen] = useState(false)

    const isOpen = (open) => {
        setModalOpen(open)
    }   

    //console.log(modalOpen);

        return <>
            <div className="navbar bg-base-100 shadow-sm ">
                <div className="navbar-start">
                    
                    <img src={logo} alt="" width={150} height={150} className="bg-white/45"/>
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <LanguageButton isOpen={isOpen} />
                        <GroupButton isOpen={isOpen} />
                        <StudentButton isOpen={isOpen} />
                        <AddButton isOpen={isOpen} />
                        
                    </ul>
                </div> */}
                <div className="navbar-end dropdown">
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <UserIcon />
                        </div>
                    </div>
                    <span className="mr-4">mx-asanchez</span>
                    <button className="btn btn-ghost btn-error rounded-full" >
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className="mb-10">
                {/* <div className="flex justify-center mt-14">
                    <InfoTarjet />
                </div>
                <div className="flex justify-between xl:justify-arround mt-14">
                    <Graphycs />
                    <BarGraphycs />
                </div>
                <div className="flex justify-center ml-30 mt-14 w-[90%] shadow-lg shadow-base-content">
                    <TableInfo />
                </div> */}
                {/* name of each tab group should be unique */}
                <div className="tabs tabs-lift aling-center justify-center mt-6">
                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <Language />
                        Language
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <LanguageS />
                    </div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <Language />
                        Groups
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <GroupTest />
                    </div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <Add />
                        Add Student
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <StudentAdd />
                    </div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        < UsersIcon/>
                        Users
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <UserScreen />
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex justify-center mt-14">
                        <InfoTarjet />
                    </div>
                    <div className="flex justify-between xl:justify-arround mt-14">
                        <Graphycs />
                        <BarGraphycs />
                    </div>
                    <div className="flex justify-center ml-30 mt-14 w-[90%] shadow-lg shadow-base-content">
                        <TableInfo />
                    </div>
                </div>
            </div>
        </>
 }

export default ScreenHome