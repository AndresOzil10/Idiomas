import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import CheckIcon from "./checkIcon";
import CloseIcon from "../icons/close";
import EditIcon from "../icons/edit";
import Trash from "../icons/trash";
import Swal from "sweetalert2";

const url_login = "http://10.144.13.5/API/idiomas/users.php";
const url = "http://10.144.13.5/API/idiomas/functions.php";

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

const TableUsers = () => {
  const [group, setGroup] = useState([]);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const Users = {
            "aksi": "getTeachersUsers"
    }
    const response = await enviarData(url, Users);
    const data = await response.data;
    const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }));
    setGroup(dataWithKeys);
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
      setEditingKey('')
  }

  const deletedTeacherUser  = async (key) => {
    const DeletedUsers = {
      "aksi": "deletedUsers",
      "id": key,
    };
    const respuesta = await enviarData(url, DeletedUsers);
    if (respuesta.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: respuesta.error,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: respuesta.success,
      });
      fetchData(); // Refrescar la tabla después de eliminar
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '15%',
      editable: true,
    },
    {
      title: 'User ',
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
      render: (_, record) => (
        <span className="flex justify-around">
          <Popconfirm title="Are you sure to delete this user?" onConfirm={() => deletedTeacherUser (record.id)}>
            <Typography.Link>
              <Trash />
            </Typography.Link>
          </Popconfirm>
        </span>
      ),
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
    };
  })

  return (
    <>
      <div className="overflow-x-auto rounded-box shadow-lg">
        <Form form={form} component={false}>
          <Table
            bordered
            dataSource={group}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default TableUsers;
