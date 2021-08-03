import React from 'react'
import './Book.css'

function Book(props){
    const style = {
      backgroundImage: `url(${props.data.url})`, 
    }
    return(
       <div className="feedback-card">
          <div className="profile-img" style={style}>
          </div>
        <div className="content">
          <div className="user-name">
            <h1>{props.data.name}</h1>
            <span>Author</span>
          </div>
          <div className="text-content">
            <p>{props.data.description}</p>
            
            <div className="icons" >
              <p><span>Price </span> {props.data.price}</p>
              <p><span>Added By </span>{props.data.userName}</p>
          </div>
          </div>
          
         
        </div>
       </div>
      
    ) 
  }

  
export default Book
