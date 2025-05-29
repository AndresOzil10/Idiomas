import { Card, List } from "antd";
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
           <List
            grid={{
            gutter: 0,
            xs: 0,
            sm: 0,
            md: 1,
            lg: 1,
            xl: 3,
            xxl: 6,
            }}
            dataSource={ceco}
            pagination={{
                pageSize: 6,
            }}
            renderItem={item => (
            <List.Item>
                <Card
                  className="text-center"
                  title={item.name}
                  style={{ backgroundColor: "#f36a71" }} // Cambia el color aquí
                >
                  {`$${item.promedio}`}
                </Card>
            </List.Item>
            )}
            />
        </div>
    )
 }

 export default InfoTarjet