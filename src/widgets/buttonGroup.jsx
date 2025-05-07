import { useEffect, useState } from "react"
import Language from "../icons/language"
import Add from "../icons/new"
import SaveIcon from "../icons/saveIcon"
import CloseIcon from "../icons/close"
import Swal from "sweetalert2"
import EditIcon from "../icons/edit"
import Trash from "../icons/trash"

import { Form, Popconfirm, Table, Typography, Input, InputNumber } from "antd"
import CheckIcon from "./checkIcon"

const url_language = "http://localhost/API/idiomas/idioma.php"
const url_login = "http://localhost/API/idiomas/groups.php"
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
    )
}

const GroupButton = ({ isOpen }) => {
    const [isGroup, setIsGroup] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isLanguage, setIsLanguage] = useState(false)
    const [group, setGroup] = useState([])
    const [form] = Form.useForm()
    
    const setData = async () => {
        const response = await fetch(url_language)
        const data = await response.json()
        const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }))
        setIsLanguage(dataWithKeys)
    }

    const fetchData = async () => {
        const response = await fetch(url_login)
        const data = await response.json()
        const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }))
        setGroup(dataWithKeys)
    }

    useEffect(() => {
        setData()
        fetchData()
    }, [setData, fetchData])

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    }

    const edit = (record) => {
        form.setFieldsValue({
          id: '',
          language: '',
          costxhour: '',
          ...record,
        });
        setEditingKey(record.key);
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
            setGroup(newData);
            setEditingKey('');
          } else {
            newData.push({ key: Date.now(), ...row }); // Ensure new items have a unique key
            setGroup(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    }

    const deleteLanguage = async (key) => {
        const Deleted = {
              "aksi": "deletedGroup",
              "id": key,
            }
            //console.log(newLanguageData)
            const respuesta = await enviarData(url_add, Deleted)
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
          title: 'Level',
          dataIndex: 'level',
          width: '15%',
          editable: true,
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            width: '15%',
            editable: true,
        },
        {
            title: 'Days',
            dataIndex: 'days',
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
              <span className="flex justify-around">
                {editable ? (
                  <>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{
                    marginInlineEnd: 8,
                  }}
                >
                  <CheckIcon />
                </Typography.Link>
                {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a className="text-[12px]">Cancel</a>
                </Popconfirm> */}
                <Typography.Link
                  onClick={cancel}
                  style={{
                    marginInlineEnd: 8,
                  }}
                >
                  <CloseIcon />
                </Typography.Link>
                  </>
                ) : (
                  <>
                <div className="flex justify-around">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{
                    marginInlineEnd: 8,
                  }} >
                      <EditIcon />
                    </Typography.Link>
                    <Popconfirm title="Are you sure to delete this language?" onConfirm={() => deleteLanguage(record.id)} >
                    <Typography.Link>
                      <Trash  />
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

    const showGroups = () => {
        setIsGroup(true)
        isOpen(true)
    }

    const closeGroup = () => {
        setIsGroup(false)
        isOpen(false)
    }

    const showAdd = () => {
        setIsAdd(true)
    }

    const closeAdd = () => {
        setIsAdd(false)
    }

    const [language, setLanguage] = useState("")
    const [level, setLevel] = useState("")
    const [schedule, setSchedule] = useState("")
    const [from, setFrom] = useState("")
    const [days, setDays] = useState("")

    const handleAddGroup = async () => {
        const newGroupAdd = {
              "aksi": "addGroup",
              "language": language,
              "level": level,
              "schedule": schedule,
              "from": from,
              "days": days,
        }

        const respuesta = await enviarData(url_add, newGroupAdd)
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
        setLanguage('')
        setLevel('')
        setDays('')
        setSchedule('')
        setFrom('')
    }

    return (
        <>
            <button className="btn btn-ghost rounded-full btn-error" onClick={showGroups}>
                <Language />
                <span>Level</span>
            </button>
            <dialog open={isGroup} className="modal">
                <div className="modal-box w-11/12 max-w-7xl border border-base-content bg-base-100 shadow-lg shadow-primary"> {/* Increased max width */}
                    
                <div className="overflow-x-auto rounded-box shadow-lg">
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={group} // Cambiar data a language
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        /> 
                    </Form>
                </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={showAdd}>
                            <Add />
                        </button>
                        <dialog open={isAdd} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl bg-primary-300">
                                <h1 className="text-center">Add User</h1>
                                <div className="form-control mt-3">
                                    <label>Language:</label>
                                </div>
                                <select 
                                    className="select w-full" 
                                    value={language} 
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option disabled={true} value="">
                                        Pick a language
                                    </option>
                                    {isLanguage && isLanguage.map((lang) => (
                                        <option key={lang.id} value={lang.id}>
                                            {lang.language}
                                        </option>
                                    ))}
                                </select>
                                <div className="form-control mt-3">
                                    <label>Level:</label>
                                </div>
                                <label className="input w-full">
                                    <Language />
                                    <input type="input" required placeholder="B1, A1, C2 ......" value={level} onChange={(e) => setLevel(e.target.value)}/>
                                </label>
                                <div className="form-control mt-3">
                                    <label>Days:</label>
                                </div>
                                <label className="input w-full">
                                    <Language />
                                    <input type="input" required placeholder="Monday-Thusday" value={days} onChange={(e) => setDays(e.target.value)}/>
                                </label>
                                <div className="form-control mt-3">
                                    <label>Schedule:</label>
                                </div>
                                <div className="form-control text-center">
                                    <label className="text-xs">From:</label>
                                </div>
                                <input type="time" className="input mb-1 w-full" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                                <div className="form-control text-center">
                                    <label className="text-xs">To:</label>
                                </div>
                                <input type="time" className="input w-full" value={from} onChange={(e) => setFrom(e.target.value)}/>
                                <div className="modal-action ml-3">
                                    <button className="btn bg-success" onClick={handleAddGroup}>
                                        <SaveIcon/>
                                    </button>
                                    <button className="btn bg-error" onClick={closeAdd}>
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                        </dialog>
                        <button className="btn btn-error" onClick={closeGroup}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                
            </dialog>
        </>
    )
}

export default GroupButton