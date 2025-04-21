import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import EditIcon from '../icons/edit';
import CheckIcon from './checkIcon';
import CloseIcon from '../icons/close';

const url_login = "http://localhost/API/idiomas/class.php"
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
    );
  };

const  TableInfo = () => { 
    const [Class, setClass] = useState([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey
    
    const fetchData = async () => {
        const response = await fetch(url_login)
        const data = await response.json()
        const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }))
        setClass(dataWithKeys)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
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
        try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            setClass(newData);
            setEditingKey('');
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
            width: '8%',
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
                style={{
                    marginInlineEnd: -100,
                  }}
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
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <EditIcon />
            </Typography.Link>
            );
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

 export default TableInfo