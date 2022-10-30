import React from 'react'



export const StudentsArray = ({showStudent,element,editContactId}) => {



 return (
   
    <tr onClick={(e)=>showStudent(e,element)}>
                
    {element.id == editContactId ?  
    <>     
     {/* <td>{element.id}</td>  */}
      <td className='colfalse'>{element.lname}</td>   
      <td className='colfalse'>{element.fname}</td>
      <td className='colfalse'>{element.year}</td>
       
    </>
    :
    <>
   {/*  <td>{element.id}</td>   */}
    <td className='coltrue' >{element.lname}</td>  
    <td className='coltrue'>{element.fname}</td>
    <td className='coltrue'>{element.year}</td> 
    
    </>
    
    }
    </tr>  
    
 )

}
