import { Button } from 'react-bootstrap'
import React from 'react'
import { useHistory } from "react-router-dom";

function DisplayUsers({ users }) {
    let history = useHistory();

    const handleClick=()=>{
        history.push("/details",users)
    }
    return (
            <tr>
                <td className="ml-4">
                    {users.id}
                </td>
                <td >
                    {users.name}
                </td>
                <td >
                    {users.username}
                </td>
                <td >
                    {users.email}
                </td>
                <td>
                    <Button onClick={handleClick} as="input" type="button" value="Input" />{''}
                </td>
            </tr>
    )
}

export default DisplayUsers
