import logo from "../assets/images/kayser_logo.webp"
import fondo from "../assets/images/fondo.jpg"
import gif from "../assets/gif/password.gif"
import user from "../assets/gif/user.gif"
import FooterLogin from "../widgets/footer"


const LoginScreen = () => { 
    return (
        <>
        <div className="h-[100vh] flex flex-col items-center bg-cover justify-center text-dark" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="h-[350px] w-80 bg-white/20 border border-white/20 backdrop-blur-lg rounded-lg px-6 my-4 overflow-hidden">
                    <h2 className="text-3xl font-blod pb-6 text-center"><img src={logo} width="100%"/></h2>
                    <form className="flex flex-col items-center" action="">
                        <div className="w-full relative">
                            <label className="input validator">
                            <img src={user} alt="" width={20} height={20}/>
                            <input type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
                            
                            </label>
                            <p className="validator-hint">
                            Complet the username
                            </p>
                        </div>
                        <div className="w-full relative">
                            <label className="input validator">
                            
                            <img src={gif} alt="" width={20} height={20}/>
                            <input type="password" required placeholder="Password" minLength="8" />
                            </label>
                            <p className="validator-hint hidden">
                            Complet the password
                            </p>
                            
                        </div>
                                
                        <button className="my-7 btn btn-soft btn-secondary btn-block">LogIn</button>
                        
                        
                    </form>
            </div>
            <FooterLogin /> 
        </div>
            
        </>
    )
 }

export default LoginScreen