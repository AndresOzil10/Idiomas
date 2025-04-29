import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import Trash from "../icons/trash"; // Asegúrate de que esta ruta sea correcta
import EditIcon from "../icons/edit";
import Language from "../icons/language";
import Add from "../icons/new";
import CloseIcon from "../icons/close";
import SaveIcon from "../icons/saveIcon";
import Swal from "sweetalert2";

const url_login = "http://localhost/API/idiomas/idioma.php"
const url_add = "http://localhost/API/idiomas/functions.php"

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type' : 'application/json'
      }
  })
  const json = await resp.json()

  return  json
}


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
  }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
)}

const LanguageButton = ({ isOpen }) => {
  const [isLanguage, setIsLanguage] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [language, setLanguage] = useState([]);
  const [form] = Form.useForm();

  const setData = async () => {
    const response = await fetch(url_login);
    const data = await response.json();
    const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }));
    setLanguage(dataWithKeys);
  }


  useEffect(() => {
    if (!isAdd) {
      setData(); // Actualizar la tabla cuando se cierre el modal de agregar
    }
  }, [isAdd]);

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      language: '',
      costxhour: '',
      ...record,
    });
    setEditingKey(record.key);
  }

  const cancel = () => {
    setEditingKey('');
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...language];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setLanguage(newData);
        setEditingKey('');
      } else {
        newData.push({ key: Date.now(), ...row }); // Ensure new items have a unique key
        setLanguage(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  const deleteLanguage = (key) => {
    const newData = language.filter((item) => item.key !== key);
    setLanguage(newData);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '15%',
      editable: true,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      width: '15%',
      editable: true,
    },
    {
      title: 'Cost per Hour',
      dataIndex: 'costxclass',
      width: '15%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <span>
            {editable ? (
              <>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{
                    marginInlineEnd: 8,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </>
            ) : (
              <>
                <div className="flex justify-around">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <EditIcon />
                    </Typography.Link>
                    <Popconfirm title="Are you sure to delete this language?" onConfirm={() => deleteLanguage(record.key)} >
                    <Typography.Link>
                        <Trash />
                    </Typography.Link>
                    </Popconfirm>
                </div>
              </>
            )}
          </span>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'costxhour' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const showLanguages = () => {
    setIsLanguage(true);
    isOpen(true);
  }

  const closeLanguage = () => {
    setIsLanguage(false);
    isOpen(false);
  }

  const showAdd = () => {
    setIsAdd(true);
  }

  const closeAdd = () => {
    setIsAdd(false);
  }

  const [newLanguage, setNewLanguage] = useState('');
  const [newCost, setNewCost] = useState('');

  const handleAddLanguage = async () => {
    //console.log('Language:', newLanguage);
    //console.log('Cost per Hour:', newCost);

    const newLanguageData = {
      "aksi": "addLanguage",
      "language": newLanguage,
      "costxclass": newCost,
    }
    //console.log(newLanguageData)
    const respuesta = await enviarData(url_add, newLanguageData)
    if(respuesta.error){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: respuesta.error,
        });
    }
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: respuesta.success,
    })
  }

  return (
    <>
      <button className="btn btn-ghost rounded-full btn-error" onClick={showLanguages}>
        <Language />
        <span>Language</span>
      </button>
      <dialog open={isLanguage} className="modal">
        <div className="modal-box w-11/12 max-w-5xl border border-base-content bg-base-content/50 shadow-lg shadow-primary">
          <div className="overflow-x-auto rounded-box bg-base-content/10 shadow-lg">
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={language}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
          <div className="modal-action ">
            <button className="btn bg-error-content/70" onClick={showAdd}><Add /></button>
            <dialog open={isAdd} className="modal">
              <div className="modal-box ">
                <h1 className="text-center">Add Language</h1>
                <div className="form-control mt-3">
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
                    <legend className="fieldset-legend">Cost per Hour:</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Cost per Hour"
                      value={newCost}
                      onChange={(e) => setNewCost(e.target.value)}
                    />
                  </fieldset>
                </div>
                <div className="modal-action ml-3">
                  <button className="btn bg-error-content/70" onClick={handleAddLanguage}><SaveIcon /></button>
                  <button className="btn bg-error-content/70" onClick={closeAdd}><CloseIcon /></button>
                </div>
              </div>
            </dialog>
            <button className="btn bg-error-content/70" onClick={closeLanguage}><CloseIcon /></button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default LanguageButton;