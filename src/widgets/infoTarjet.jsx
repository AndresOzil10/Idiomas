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

    const [ceco, setCeco] = useState([]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="flex w-full flex-col">
           <List
            grid={{
            gutter: 0,
            xs: 0,
            sm: 0,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 10,
            }}
            dataSource={ceco}
            pagination={{
                pageSize: 10,
            }}
            renderItem={item => (
            <List.Item>
                <Card
                  className="text-center"
                  title={item.name}
                  style={{ backgroundColor: "#fd5862" }} //#a5aba4, #739fa8, #afd6ff, #86add3
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