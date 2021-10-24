import React from 'react'
import {Link} from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import {db} from '../../firebase'

function NavbarList(props) {
    
    const {logout, currentUser} = useAuth()
    async function handleAdminRequest() {
        db.collection("adminRequests").doc(currentUser.uid).set({
            uid: currentUser.uid,
         }, { merge: true })
         .then(() => {
            alert("Request has been made");
        })
        .catch((error) => {
            alert("Failed");
            console.error("Error writing document: ", error);
        });
    }
    const navItem = props.items;
    async function handleLogout(){
        logout()
    }
    return (
        <nav>
            <Link to = {{pathname: `/${navItem[0].link}`}} key={navItem[0].btn} ><li>{navItem[0].btn}</li> </Link>
            
            {
                currentUser && !currentUser.isAdmin? <>
               
                <Link to = {{pathname: `/${navItem[4].link}`}} key={navItem[4].btn}  onClick={handleAdminRequest}><li>{navItem[4].btn}</li> </Link> 
                <Link to = {{pathname: `/${navItem[5].link}`}} key={navItem[5].btn} ><li>{navItem[5].btn}</li> </Link> 
                <Link to = {{pathname: `/${navItem[6].link}`}} key={navItem[6].btn} ><li>{navItem[6].btn}</li> </Link> 
                <Link to = {{pathname: `/${navItem[3].link}`}} key={navItem[3].btn} onClick={handleLogout} ><li>{navItem[3].btn}</li> </Link>
                </>:null
            }

            {
                currentUser && currentUser.isAdmin? <>
                    <Link to = {{pathname: `/${navItem[5].link}`}} key={navItem[5].btn} ><li>{navItem[5].btn}</li> </Link> 
                    <Link to = {{pathname: `/${navItem[6].link}`}} key={navItem[6].btn} ><li>{navItem[6].btn}</li> </Link> 
                    <Link to = {{pathname: `/${navItem[7].link}`}} key={navItem[7].btn} ><li>{navItem[7].btn}</li> </Link> 
                    <Link to = {{pathname: `/${navItem[3].link}`}} key={navItem[3].btn} onClick={handleLogout} ><li>{navItem[3].btn}</li> </Link>
                </>:null
            }

            {   !currentUser&& 
                <>
                    <Link to = {{pathname: `/${navItem[1].link}`}} key={navItem[1].btn}><li>{navItem[1].btn}</li> </Link> 
                    <Link to = {{pathname: `/${navItem[2].link}`}} key={navItem[2].btn}><li>{navItem[2].btn}</li> </Link> 
                </>
            }

            
            
            

            {/* {
                navItem.map((item) => {

                        if(item.btn === "Filter" ){
                            return <Link to = {{pathname: `/${item.link}`}} key={item.btn} onClick={filterHandle} ><li>{item.btn}</li> </Link>    
                        }
                        else    
                            return <Link to = {{pathname: `/${item.link}`}} key={item.btn}><li>{item.btn}</li> </Link> 
                    })
            } */}
        </nav>
    )
}

export default NavbarList
