import { useState } from "react"
import logo from "../assets/images/kayser_logo.webp"
import LogoutIcon from "../icons/logoutIcon"
import UserIcon from "../icons/user"
import Language from "../icons/language"
import LanguageS from "../widgets/language"
import GroupTest from "../widgets/grupo"


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
                        <input type="radio" name="my_tabs_4" defaultChecked />
                        <Language />
                        Groups
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <GroupTest />
                    </div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                        Love
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
                </div>
            </div>
        </>
 }

export default ScreenHome