import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import EditIcon from '../icons/edit';
import CheckIcon from './checkIcon';
import CloseIcon from '../icons/close';
import Trash from '../icons/trash';
import Swal from 'sweetalert2';
import { Select } from 'antd';

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

const  TableInfo = () => { 
    const [Class, setClass] = useState([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey

    
    const fetchData = async () => {
      const Clase = {
            "aksi": "getClassList"
        }
        const response = await enviarData(url, Clase)
        const data = await response.data
        const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }))
        setClass(dataWithKeys)
    }

    const [options, setOptions] = useState([]);

    const getLanguage = async () => {
      const Language = {
      "aksi": "getLanguages"
      }
      const response = await enviarData(url, Language)
      const data = await response.data
      const opts = data.map((item) => ({
        label: item.language,
        value: item.id
      }));
      setOptions(opts);
    }

    useEffect(() => {
      fetchData();
      getLanguage();
      // eslint-disable-next-line
    }, [fetchData]);

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
      let inputNode
      if (dataIndex === 'idioma') {
      inputNode = (
        <Select>
        {options.map(opt => (
          <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
          </Select.Option>
        ))}
        </Select>
      );
      } else if (dataIndex === 'group') {
      inputNode = (
        <Select>
        {groupOptions.map(opt => (
          <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
          </Select.Option>
        ))}
        </Select>
      );
      } else {
      inputNode = inputType === 'number' ? <InputNumber /> : <Input />
      }

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

    
    const edit = (record) => {
        form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
        });
        setEditingKey(record.key);
    }

    const cancel = () => {
        setEditingKey('');
    }

    const save = async (key) => {
        console.log(key)
        try {
            const row = await form.validateFields();
            const newData = [...Class];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setClass(newData);
                setEditingKey('');
                const data = {
                    aksi: "updateStudent",
                    id: item.id,
                    idioma: row.idioma,
                    group: row.group,
                    ceco: row.ceco
                }
                console.log(data)
                // const respuesta = await enviarData(url, data)
                // if(respuesta.error){
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: respuesta.error,
                //     })
                // }
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Éxito',
                //     text: respuesta.success,
                // })
                // fetchData()
            } else {
                newData.push(row);
                setClass(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '5%',
            editable: false,
        },
        {
            title: 'NN',
            dataIndex: 'nn',
            width: '5%',
            editable: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
            editable: false,
        },
        {
            title: 'Language',
            dataIndex: 'idioma',
            width: '20%',
            editable: true,
        },
        {
            title: 'Group',
            dataIndex: 'group',
            width: '25%',
            editable: true,
        },
        {
            title: 'CeCo',
            dataIndex: 'ceco',
            width: '10%',
            editable: true,
        },
        {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
            <span className='flex justify-around'>
                <Typography.Link
                onClick={() => save(record.key)}
                
                >
                    <CheckIcon />
                </Typography.Link>
                <Typography.Link
                onClick={cancel}
                >
                    <CloseIcon />
                </Typography.Link>
            </span>
            ) : (
            <>
                <div className="flex justify-around">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} >
                      <EditIcon />
                    </Typography.Link>
                    <Popconfirm title="Are you sure to delete this language?" onConfirm={() => deletedStudent(record.id)} >
                    <Typography.Link>
                      <Trash  />
                    </Typography.Link>
                    </Popconfirm>
                </div>
                  </>
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
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    })

    const deletedStudent = async (key) => {
      const Deleted = {
        "aksi": "deletedStudent",
        "id": key,
      }
            // console.log(Deleted)
      const respuesta = await enviarData(url, Deleted)
      if(respuesta.error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: respuesta.error,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: respuesta.success,
      })
    }

    return <>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
            <Form form={form} component={false}>
                <Table
                components={{
                body: {
                    cell: EditableCell,
                },
                }}
                bordered
                dataSource={Class}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                onChange: cancel,
                }}
                />
            </Form>
        </div>
    </>
 }

// Opciones para los selects


const groupOptions = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
  { label: 'B1', value: 'B1' },
  { label: 'B2', value: 'B2' },
  { label: 'C1', value: 'C1' },
  { label: 'C2', value: 'C2' },
  // Agrega más grupos si es necesario
]

export default TableInfo