import { useState } from "react"
import logo from "../assets/images/kayser_logo.webp"
import LogoutIcon from "../icons/logoutIcon"
import UserIcon from "../icons/user"

const TeacherScreen = () => { 

    return <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <img src={logo} alt="" width={150} height={150} />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* <LanguageButton isOpen={isOpen} />
                        <GroupButton isOpen={isOpen} />
                        <StudentButton isOpen={isOpen} />
                        <AddButton isOpen={isOpen} /> */}
                        <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
                        
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
                <div className="flex justify-center mt-14">
                    
                    
                </div>
        </>
 }

 export default TeacherScreen