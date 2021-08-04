import React, {useState,useEffect} from 'react'
import './AdminPanel.css'
import {db} from '../../firebase'
import {Link } from "react-router-dom";


function AdminPanel() {

    const [allUsers, setAllUsers] = useState(null)

    function handledelete(data) {
        
        let flag  = window.confirm("you want to delete " + data.firstName + " account?");
        if(flag === true){
            db.collection("users").doc(data.uid).set({
                isDelete:true,
                isActive:false
             },  { merge: true })
             .then(() => {
                 alert("User is Deleted");
             })
             .catch((error) => {
                alert("Unable to delte.");
                 console.error("Error writing document: ", error);
             });
        }
    }
    useEffect(() => {
        db.collection('users').get().then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        const result = documents.filter(word => word.isDelete === false);
        setAllUsers(result)
        })
    }, [])
    

    return (allUsers && 
        <div className="admin-panel">
            <h1>User Details</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                    {/* <th scope="col">userID</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((user) => {
                            return <tr key={user.uid}>
                                {/* <th scope="row">{user.uid}</th> */}
                                <td>{user.firstName}</td>
                                <td><textarea defaultValue={user.addressOne} ></textarea></td>
                                <td><textarea defaultValue={user.addressTwo}></textarea></td>
                                <td>{user.mobileNo}</td>
                                <td className="edit"><Link to={{ pathname: `/cuser/${user.firstName}`,
                                                currentUser:user
                                                }} props={user}>edit</Link></td>
                                <td className="delete"  onClick={() => {handledelete(user)}} data={user}>delete</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminPanel
