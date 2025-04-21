const TeacherScreen = () => { 
    return <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <img src={logo} alt="" width={150} height={150} />
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
                <div className="flex justify-between mt-52">
                    <TableInfo />
                    <Graphycs />
                    <BarGraphycs />
                </div>
            </div>
        </>
 }

 export default TeacherScreen