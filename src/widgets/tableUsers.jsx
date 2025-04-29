import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import CheckIcon from "./checkIcon";
import CloseIcon from "../icons/close";
import EditIcon from "../icons/edit";
import Trash from "../icons/trash";


const url_login = "http://localhost/API/idiomas/users.php"

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

const TableUsers = () => { 

    const [group, setGroup] = useState([])
    const [form] = Form.useForm()
    
    const fetchData = async () => {
      if (group.length === 0) { // Verificar si los datos ya fueron cargados
        const response = await fetch(url_login)
        const data = await response.json()
        const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }))
        setGroup(dataWithKeys)
      }
    }
    
    useEffect(() => {
      fetchData()
    }, [])
    
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

    const deleteLanguage = (key) => {
        const newData = language.filter((item) => item.key !== key);
        setGroup(newData);
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          width: '15%',
          editable: true,
        },
        {
          title: 'User',
          dataIndex: 'user',
          width: '15%',
          editable: true,
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
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

    const handleAddLanguage = async () => {
        const values = await form.validateFields();
        const newLanguage = {
          key: Date.now(), // Generar un ID único
          ...values,
        };
        setGroup([...language, newLanguage]);
        closeAdd();
    }
    
    return <>
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
    </>
 }

 export default TableUsers
