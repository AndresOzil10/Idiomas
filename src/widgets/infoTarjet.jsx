import { useEffect, useState } from "react";

const url = "http://localhost/API/idiomas/functions.php";

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

const InfoTarjet = () => { 
    const [ceco, setCeco] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const DeletedUsers = {
              "aksi": "ChargeCeCo",
            }
        const respuesta = await enviarData(url, DeletedUsers)
        if(respuesta.estado === true){
            setCeco(respuesta.data);
        } else {
            console.error("Error fetching data:", respuesta.mensaje);
        }
    }
    return (
        <div className="flex w-full flex-col">
            <div className="stats stats-vertical lg:stats-horizontal sdow">
                {ceco.map((item, idx) => (
                    <div className="stat" key={idx}>
                        <div className="stat-title">{item.name || "CeCo"}</div>
                        <div className="stat-value">
                            {item.promedio ? `$${item.promedio}` : "-"}
                        </div>
                        <div className="stat-desc">{""}</div>
                    </div>
                ))}
            </div>
        </div>
    )
 }

 export default InfoTarjet