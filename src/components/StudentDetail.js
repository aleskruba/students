import React from 'react'


export const StudentDetail = ({studentDetail, handleDeleteClick, editContactId, hideDetails,setupdateWindowActive}) => {

  
  return (
    <div >
          
          <ul>
       {/*  <li><b>id</b> :   {editContactId}</li>   */}
        <li><b>Last Name</b> :   {studentDetail.lname}</li>  
        <li><b>First Name</b> :   {studentDetail.fname}</li>     
        <li><b>Date of birth</b> :   {studentDetail.year}</li>  
        <li><button onClick={()=>{handleDeleteClick(editContactId)}}>delete</button>
            <button onClick={()=>{setupdateWindowActive(false) ; }}  >update profile</button>
            <button onClick={hideDetails}  >hide details</button>  </li> 
        
     
 
     </ul>  
    

 </div>

  )
}
