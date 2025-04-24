import { useState } from "react"
import logo from "../assets/images/kayser_logo.png"
import LogoutIcon from "../icons/logoutIcon"
import UserIcon from "../icons/user"
import BarGraphycs from "../widgets/bargraphycs"
import AddButton from "../widgets/buttonAdd"
import GroupButton from "../widgets/buttonGroup"
import LanguageButton from "../widgets/buttonLanguage"
import StudentButton from "../widgets/buttonStudent"
import Graphycs from "../widgets/graphycs"
import InfoTarjet from "../widgets/infoTarjet"
import TableInfo from "../widgets/tableInfo"


const HomeScreen = () => { 

    const [modalOpen, setModalOpen] = useState(false)

    const isOpen = (open) => {
        setModalOpen(open)
    }   

    //console.log(modalOpen);

        return <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    
                    <img src={logo} alt="" width={150} height={150} className="bg-base-content/30"/>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <LanguageButton isOpen={isOpen} />
                        <GroupButton isOpen={isOpen} />
                        <StudentButton isOpen={isOpen} />
                        <AddButton isOpen={isOpen} />
                        
                    </ul>
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
            <div className={modalOpen ? "blur-lg" : ""}>
                <div className="flex justify-center mt-14">
                    <InfoTarjet />
                </div>
                <div className="flex justify-between xl:justify-arround mt-14">
                    <Graphycs />
                    <BarGraphycs />
                </div>
                <div className="flex justify-center mt-14">
                    <TableInfo />
                </div>
            </div>
        </>
 }

export default HomeScreen