import React, { useEffect } from 'react'
import  '../App.css'
export const EditStudents = ({handleEditFormChange,editNamesArray,editNames,setupdateWindowActive}) => {
  

    return (
     
   
    <form onSubmit={editNamesArray}>

      <ul>
   <li><b>Last Name</b> : <input type='text' value={editNames.lname}  name='lname' required="required" placeholder='enter a last name' onChange={handleEditFormChange}/> </li>
   <li><b>First Name</b> : <input type='text'  value={editNames.fname} name='fname' required="required"  placeholder='enter a name' onChange={handleEditFormChange}/> </li>
   <li><b>Year</b> : <input type='text'     value={editNames.year}  name='year'required="required"  placeholder='enter a year' onChange={handleEditFormChange}/> </li>
   <li><input type='submit' value="update"/></li>
   <li><input type='button' onClick={()=>setupdateWindowActive(true)}  value="cancel"/></li>
     </ul>
  </form>

    )
}


