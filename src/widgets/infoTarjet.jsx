import { Card, List, Spin, Alert } from "antd";
import { useEffect, useState, useCallback } from "react";

const url = "http://10.144.13.5/API/idiomas/functions.php";

const enviarData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await resp.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

const InfoTarjet = () => { 
  const [ceco, setCeco] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const DeletedUsers = { "aksi": "ChargeCeCo" };

    try {
      const respuesta = await enviarData(url, DeletedUsers);
      if (respuesta.estado === true) {
        setCeco(respuesta.data);
      } else {
        throw new Error(respuesta.mensaje);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
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
              style={{ backgroundColor: "#ff695c" }} //#a5aba4, #739fa8, #afd6ff, #86add3
            >
              {`$${item.promedio}`}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default InfoTarjet