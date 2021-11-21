import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import DisplayUsers from './DisplayUsers'


function Users() {
    const [usersData, setusersData] = useState([])
    
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                setusersData(res.data)
            })
    }, [])
    console.log(usersData);

    return (
        <div className="container-fluid" style={{ textAlign:"center"}}>
            <Table striped bordered hover >
                <thead>
                    <tr >
                        <th >id</th>
                        <th> Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>View profile</th>
                    </tr>
                </thead>
                <tbody>
                 {usersData && usersData.map((obj, i) =>
                    <DisplayUsers key={i} users={obj}/>)}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
