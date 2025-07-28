import { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import Trash from "../icons/trash"; 
import EditIcon from "../icons/edit";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import Swal from "sweetalert2";

const url_add = "http://10.144.13.5/API/idiomas/functions.php";

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

const LanguageS = () => {
  const [languages, setLanguages] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [newCost, setNewCost] = useState('');
  const [updateLanguage, setUpdateLanguage] = useState('');
  const [updateCost, setUpdateCost] = useState('');

  const fetchLanguages = useCallback(async () => {
    const response = await enviarData(url_add, { "aksi": "getLanguages" });
    setLanguages(response.data || []);
  }, []);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const deleteLanguage = async (id) => {
    const response = await enviarData(url_add, { "aksi": "deletedLanguage", "id": id });
    if (response.error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: response.error });
    } else {
      Swal.fire({ icon: 'success', title: 'Éxito', text: response.success });
      fetchLanguages(); // Actualiza la lista después de eliminar
    }
  }

  const handleAddLanguage = async () => {
    setIsLoading(true);
    if (!newLanguage || !newCost) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill all fields' });
      setIsLoading(false);
      return;
    }

    const newLanguageData = {
      "aksi": "addLanguage",
      "language": newLanguage,
      "costxclass": newCost,
    };

    const response = await enviarData(url_add, newLanguageData);
    if (response.error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: response.error });
    } else {
      Swal.fire({ icon: 'success', title: 'Éxito', text: response.success });
      fetchLanguages(); // Actualiza la lista después de agregar
    }
    setNewLanguage('');
    setNewCost('');
    setIsLoading(false);
  }

  const saveChanges = async () => {
    const updatedLanguageData = {
      "aksi": "updateLanguage",
      "id": selectedRow.id,
      "language": updateLanguage,
      "costxclass": updateCost,
    };

    const response = await enviarData(url_add, updatedLanguageData);
    if (response.error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: response.error });
    } else {
      Swal.fire({ icon: 'success', title: 'Éxito', text: response.success });
      fetchLanguages(); // Actualiza la lista después de editar
      setShowRowModal(false); // Cierra el modal
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box shadow-lg">
        <Table dataSource={languages} rowKey="id">
          <Table.Column title="Id" dataIndex="id" />
          <Table.Column title="Language" dataIndex="language" />
          <Table.Column title="Cost x Class" dataIndex="costxclass" />
          <Table.Column
            title="Options"
            render={(text, record) => (
              <>
                <button
                  className="btn btn-ghost btn-primary"
                  onClick={() => {
                    setSelectedRow(record);
                    setUpdateLanguage(record.language);
                    setUpdateCost(record.costxclass);
                    setShowRowModal(true);
                  }}
                >
                  <EditIcon />
                </button>
                <button className="btn btn-ghost btn-error" onClick={() => deleteLanguage(record.id)}>
                  <Trash />
                </button>
              </>
            )}
          />
        </Table>
      </div>

      {/* Modal para editar el idioma */}
      {showRowModal && selectedRow && (
        <dialog open={showRowModal} className="modal">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Language Details</h2>
            <fieldset className="fieldset">
              <p><strong>Id:</strong> {selectedRow.id}</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Language:</legend>
              <input
                type="text"
                className="input"
                placeholder="Language"
                value={updateLanguage}
                onChange={(e) => setUpdateLanguage(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cost x Class:</legend>
              <input
                type="text"
                className="input"
                placeholder="Cost per Class"
                value={updateCost}
                onChange={(e) => setUpdateCost(e.target.value)}
              />
            </fieldset>
            <div className="modal-action">
              <button className="btn bg-success" onClick={saveChanges}>
                <SaveIcon />
              </button>
              <button className="btn bg-error" onClick={() => setShowRowModal(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Botón para agregar un nuevo idioma */}
      <div className="modal-action">
        <button className="btn bg-primary" onClick={() => setIsAdd(true)}>
          <Add />
        </button>
        <dialog open={isAdd} className="modal">
          <div className="modal-box">
            <h1 className="text-center">Add Language</h1>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Language:</legend>
              <input
                type="text"
                className="input"
                placeholder="Language"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cost per Class:</legend>
              <input
                type="text"
                className="input"
                placeholder="Cost per Class"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
              />
            </fieldset>
            <div className="modal-action ml-3">
              <button
                className="btn bg-accent"
                onClick={handleAddLanguage}
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-infinity text-secondary-content"></span> : <SaveIcon />}
              </button>
              <button className="btn bg-error" onClick={() => setIsAdd(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default LanguageS
