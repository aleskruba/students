import React, { Fragment, useEffect, useState,useRef } from 'react'

import { StudentsArray } from './StudentsArray'
import { EditStudents } from './EditStudents'
import { StudentDetail } from './StudentDetail'
import { Header } from './Header'
import { Assessment } from './Assessment'
import  '../App.css'
import useLocalStorage from './useLocalStorage'
import { nanoid } from 'nanoid'




export const StudentsComp = () => {

  const inputRef = useRef("")

 const resetInput = () => {
    inputRef.current.focus()}


const [openDIv,setOpenDIv] = useState(false)

  const handleAddStudent = () => (  
       setOpenDIv(preAdd => !preAdd)
    )
  

const [students,setStudents] = useState({
  id:'',
  fname:'',
  lname:'',
  year:'',
  studentStatus:false

})  


const [arrStudents, setarrStudents] = useLocalStorage('students',[

])




const handlerChange = (e) => {
  e.preventDefault()
  setStudents({...students,[e.target.name]:e.target.value})
}


const handlerSubmit = (e) => {
  e.preventDefault()

  const newStudent = {
    id: nanoid(),
    fname : students.fname,
    lname : students.lname,
    year : students.year,

   }
   
   
  setarrStudents([...arrStudents,newStudent])
  
  setStudents({
    fname:'',
    lname:'',
    year:''
  })
  resetInput()

}



function showStudent(e,student) {
     e.preventDefault()
    setOpenDIv(false)
    seteditContactId(student.id)
    

     setudentDetail({
      id:student.id,
      fname:student.fname,
      lname:student.lname,
      year:student.year,
    })  

     ///
    const newName = {
      id: student.id,
     fname: student.fname,
     lname: student.lname,
     year: student.year
       }
       setEditNames(newName)
    ///
       
  }
 
   
const [studentDetail,setudentDetail] = useState({
  id:'',
  fname:'',
  lname:'',
  year:''
})

const handleDeleteClick = (contactId) => {
  if(window.confirm("Are you sure that you want to delete that student ?")) {
  const newContact = [...arrStudents].filter(con => con.id !== contactId)

  setarrStudents(newContact) 
  seteditContactId(null) }

}

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const [numberOfStudents,setnumberOfStudents] = useState()
useEffect(()=>{
    setnumberOfStudents(arrStudents.length)
}
,[arrStudents])

const [editContactId,seteditContactId] = useState(null)


const hideDetails = () => {
  seteditContactId(null)
  
}

//--------------------------------------------------------edit



const [editNames,setEditNames] = useState({
  id:'',
  fname:'',
  lname:'',
  year:''
})

const handleEditFormChange = (e) => {
      e.preventDefault()
     
      setEditNames({...editNames,[e.target.name]:e.target.value})
      
     }

const editNamesArray = (e) => {
     
      setupdateWindowActive(true)
      e.preventDefault()
      const editedContact = {
        id: editContactId,
        fname : editNames.fname,
        lname :editNames.lname,
        year :editNames.year
      }
    
      const NewContacts = [...arrStudents]
      const index = arrStudents.findIndex((con)=> con.id === editContactId )
    
      NewContacts[index] = editedContact

      setudentDetail({
        id:editContactId,
        fname:editNames.fname,
        lname:editNames.lname,
        year:editNames.year
      })  
      setarrStudents(NewContacts)
      seteditContactId(editContactId)

   
    }

  const [updateWindowActive, setupdateWindowActive] = useState(true)




// - ----------------sorting by numbers
  const sortingNumbers = (col) => {
            const sorted = [...arrStudents].sort( (a,b)=>
            a[col] > b[col] ? 1: -1 );
          
          setarrStudents(sorted);
          }
 // - ----------------sorting by letters       
const [order,setOrder] = useState("ASC")

const sorting = (col) => {
    if (order === "ASC") {
        const sorted = [...arrStudents].sort( (a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
      
      setarrStudents(sorted);
      setOrder("DSC")
      }
  
    if (order === "DSC") {
        const sorted = [...arrStudents].sort( (a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
      
      setarrStudents(sorted);
      setOrder("ASC")
      } 
  //-----------------------------------------------------------------


}


return (
    <>
      <div className="container">
          <div className="flex-item flex-item-1">
  
         <Header today={today} numberOfStudents={numberOfStudents}/>
           
        <div className='newstudent'>  
    {openDIv ? 
          <form  onSubmit={handlerSubmit} style={{margin:"auto", padding:'15px' , maxWidth:"400px",alignContent:"center"}}>
            <div >
        
                <input  type='text' name='lname' value={students.lname} placeholder='last name' autoFocus ref={inputRef} onChange={handlerChange} required/>
                
        
                <input type='text'  name='fname' value={students.fname}  placeholder='first name'  onChange={handlerChange} required/>
                
        
                <input type='number'  name='year' value={students.year} placeholder='year'  onChange={handlerChange} required/>
       
        
                <div className='buttonsDiv'>             
                    <input type='submit' value='save'/>
                    <input type='button' onClick={handleAddStudent} value='cancel'/>
                </div>
            </div>
          </form>
               
      : 

          <div style={{font: 'Lucida Sans',margin:'15px' }} onClick={handleAddStudent} >

                <h3>Add new students - CLICK HERE</h3>

          </div>
          } 
   	   </div>  




          <div className='listofstudents'>
          <pre>Click on "last name" or  "year" in order to sort the data </pre>
          <pre>Click on Student to see Student's details </pre>
   
        <table >
         
          <thead >
              <tr>
               {/* <th className='sorting' onClick={()=> sortingNumbers("id")} style={{width :'5px'}}>ID</th> */}
                <th className='sorting' onClick={()=> sorting("lname")}>LAST NAME</th>
                <th >FIRST NAME</th>
                <th className='sorting' onClick={()=> sorting("year")} >YEAR</th>
                           </tr>
              </thead>
          <tbody>
              {arrStudents.map((element,key) => (
                       
                          <StudentsArray key={key} 
                            showStudent={showStudent} 
                            element={element} 
                            editContactId={editContactId}/>
                     
              ))}
          </tbody>
        </table>  

         
        </div>
    </div>

    
    <div className="flex-item flex-item-2">

         {editContactId  == studentDetail.id  &&
                           
       <Fragment>
        
                {updateWindowActive ? 
                <Fragment>
                <StudentDetail 
                    showStudent={showStudent} 
                    hideDetails={hideDetails}
                    handleDeleteClick={handleDeleteClick}
                    studentDetail={studentDetail}  
                    editContactId={editContactId}
                    setupdateWindowActive= {setupdateWindowActive}
                   />    

                    
                  <div className="assessment">
                  <Assessment editContactId={editContactId}             


                              />
                  </div>
                   
                   
                   </Fragment>
                   
                       
              : 
                  <EditStudents setupdateWindowActive={setupdateWindowActive}
                                showStudent={showStudent}
                                editNames={editNames} 
                                handleEditFormChange={handleEditFormChange} 
                                editNamesArray={editNamesArray}/>
                    }

                          

       </Fragment> }   

                   
        </div> 


</div>
</>     
      
  )
}


