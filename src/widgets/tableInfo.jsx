import React, { useEffect, useState, useCallback } from 'react';
import Trash from '../icons/trash';
import Swal from 'sweetalert2';

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

const TableInfo = () => {
  const [classData, setClassData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchData = useCallback(async () => {
    const Clase = { aksi: "getClassList" };
    try {
      const response = await enviarData(url, Clase);
      const data = response.data || [];
      const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }));
      setClassData(dataWithKeys);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deletedStudent = async (id) => {
    const Deleted = { aksi: "deletedStudent", id };
    try {
      const respuesta = await enviarData(url, Deleted);
      if (respuesta.error) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: respuesta.error });
      } else {
        Swal.fire({ icon: 'success', title: 'Éxito', text: respuesta.success });
        fetchData();
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Ocurrió un error inesperado' });
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(classData.length / pageSize);
  const paginatedData = classData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="overflow-x-auto rounded-box shadow-lg">
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Language</th>
              <th>NN</th>
              <th>Name</th>
              <th>Group</th>
              <th>CeCo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.language}</td>
                <td>{item.nn}</td>
                <td>{item.name}</td>
                <td>{item.group}</td>
                <td>{item.ceco}</td>
                <td>
                  <button className="btn btn-ghost btn-error" onClick={() => deletedStudent(item.id)}>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-sm mx-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm mx-1 ${currentPage === idx + 1 ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-sm mx-1"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableInfo
