import logo from "../assets/images/kayser_logo.webp"
import fondo from "../assets/images/fondo.jpg"
import gif from "../assets/gif/password.gif"
import user from "../assets/gif/user.gif"
import FooterLogin from "../widgets/footer"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const url = "http://localhost/API/idiomas/functions.php"

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await resp.json();
  return json;
}

const LoginScreen = () => { 
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            aksi: "login",
            username: username,
            password: password
        }
        const respuesta = await enviarData(url, data)
        if (respuesta.estado === true) {
            if(respuesta.tipo == 3){
                navigate('/Teacher', {
                    state: {
                        username: respuesta.data,
                    }
                })
            } else if (respuesta.tipo == 2) {
                navigate('/Home', {
                    state: {
                        username: respuesta.data,
                    }
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respuesta.error,
            })
        }
        
    };

    return (
        <>
        <div className="h-[100vh] flex flex-col items-center bg-cover justify-center text-dark" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="h-[350px] w-80 bg-white/20 border border-white/20 backdrop-blur-lg rounded-lg px-6 my-4 overflow-hidden">
                    <h2 className="text-3xl font-blod pb-6 text-center"><img src={logo} width="100%"/></h2>
                    <form className="flex flex-col items-center" action="" onClick={handleSubmit}>
                        <div className="w-full relative">
                            <label className="input validator">
                            <img src={user} alt="" width={20} height={20}/>
                            <input
                                type="input"
                                required
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            </label>
                            <p className="validator-hint">
                            Complet the username
                            </p>
                        </div>
                        <div className="w-full relative">
                            <label className="input validator">
                            <img src={gif} alt="" width={20} height={20}/>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                minLength="8"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            </label>
                            <p className="validator-hint hidden">
                            Complet the password
                            </p>
                        </div>
                        <button className="my-7 btn btn-soft btn-secondary btn-block" type="submit" >LogIn</button>
                    </form>
            </div>
            <FooterLogin /> 
        </div>
        </>
    )
 }

export default LoginScreen