import React, { useEffect, useState } from 'react'
import { api } from '../../../utils/api';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ListUser() {

  const [userInfo, setUserInfo] = useState([]);

  const getUser = async () => {
    const data = await api.get(import.meta.env.VITE_USER);
    console.log(data.data);
    setUserInfo(data.data);

  }

  const updateData = async (id) => {
    
    try {
      await api.put(`${import.meta.env.VITE_USER}/${id}/active`);
      await getUser(); // Refresh the table after update
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };
  

  useEffect(() => {
    getUser()
  }, [])

  return (

    <>
      <Table striped bordered hover responsive className="mt-4 bg-light shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Birthday</th>
            <th>Active</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {userInfo.length > 0 ? ( userInfo.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>{user.birthDate}</td>
              <td>{user.IsActive ? 'Yes' : 'No'}</td>
              <td>
                <Link onClick={() => updateData(user.id)} className="text-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </td>
              <td>
                <Link to="../user/edit" state={{ userId: user.id }} className="text-primary">
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </td>
            </tr>
          ))) : (
  <tr>
    <td colSpan="9">No users found.</td>
  </tr>
)}
        </tbody>
      </Table>
      {/* <p>
        {userInfo && userInfo.map((user) => (
          <div key={user.id}>
            <h2>{user.userName}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))} 
      </p> */}
    </>
  )
}
