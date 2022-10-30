import React, { Fragment, useState,useContext, createContext } from 'react'
import useLocalStorage from './useLocalStorage'
import { nanoid } from 'nanoid'





export const Assessment = ({editContactId}) => {

  const [grades,setGrades] = useState({
    id:'',
    idStudent:'',
    date:'',
    grade:'',
    note:''
 
  })  

  
  const [gradesArray,setgradesArray] = useLocalStorage('grades',[])


  
  const today = new Date()
  


  const handlerSubmitGrades = (e) => {
    e.preventDefault()

    const newGrade = {
      id: nanoid(),
      idStudent:editContactId,
      date: today.toDateString(),
      grade: grades.grade,
      note:  grades.note

    }
  
    setgradesArray([...gradesArray,newGrade])


    setGrades({
      grade:"1",  
      note:''
    })

  }




  const handleDeleteGradeClick= (ID) => {
    if(window.confirm("Are you sure that you want to delete that grade ?")) {
    const newGrade = [...gradesArray].filter(con => con.id !== ID)
    setgradesArray(newGrade)   }
  
  }

///-----------------------------------------------------edit 

  const handleEditFormGradeChange= (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value;

    const newFormData = { ...editFormGradeData};
    newFormData[fieldName] = fieldValue

    setEditFormGradeData(newFormData)


}

const handleEditFormGradeSubmit = (event) => {
  event.preventDefault();

  const editedGrade = {
    id: editGradeId,
    idStudent:editContactId,
    date: new Date().toDateString(),
    grade: editFormGradeData.grade,
    note: editFormGradeData.note,
    
  };
  const newGrade = [...gradesArray];   
  const index = gradesArray.findIndex( (grade)=> grade.id === editGradeId )   

  newGrade[index] = editedGrade;

  setgradesArray(newGrade);
  setEditGradeId(8);

}

  const [editFormGradeData,setEditFormGradeData] = useState({
    id: '',
    idStudent: '',
    date: '',
    grade: '',
    note: ''
})

  const [editGradeId,setEditGradeId] = useState(null)

  const handleEditGradeClick = (event,grade) => {
    event.preventDefault()
    setEditGradeId(grade.id)

    const formValues = {
        id: grade.id,
        idStudent: grade.idStudent,
        date: grade.date,
        grade: grade.grade,
        note: grade.note
    }
    setEditFormGradeData(formValues)

}

const  handleCancelGradeClick = () => {
  setEditGradeId(null)
}



const handlerChangeGrades = (e) => {
  e.preventDefault()
  setGrades({...grades,[e.target.name]:e.target.value})

  

}


const CountGrades = [...gradesArray].filter(item => item.idStudent === editContactId);
const GradesLength = CountGrades.length;


let totalCountGrades = CountGrades.reduce((total,item)=> total + parseInt(item.grade),0)
let AverageGrade =  totalCountGrades/CountGrades.length
let result = Math.round(AverageGrade * 100) / 100

  


    return (
    <>    
    
    <form onSubmit={handlerSubmitGrades}>
     
   <label>Choose a grade:</label>    
   
   <select style={{width:'230px'}} required name='grade' value={grades.grade} onChange={handlerChangeGrades} > 
                <option   value="">choose grade - 1 is the best</option>
                <option   value="1">1</option>
                <option   value="2">2</option>
                <option    value="3">3</option>
                <option    value="4">4</option>
                <option    value="5">5</option>
  </select>


<br/>
   <label id="note">Write a note</label>
   <br/>
      <textarea style={{resize:"none"}} type='text' name="note" rows="4" cols="50" value={ grades.note} required onChange={handlerChangeGrades}/>   
      <div className='savegrade' >
      <input style={{marginLeft:"-30px", width:"390px"}} type='submit' value="save"/></div>
    
    </form>
    
      <div className='assessment-table'>

   
      <h5>Total number of grades is {GradesLength}  - Average grade is is {result} </h5>
     
          

        
      <form onSubmit={handleEditFormGradeSubmit}>
            <table>
                <thead>
                <tr>  
             {/*}       <th>IDGrade</th>
                    <th>IDStudent</th> */}
                    <th>Date</th>
                    <th>Grade</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody> 
            


                  {gradesArray.map( (element,key) => (
                <Fragment key={element.id}>
                  {editContactId ==   element.idStudent  && 
                      <Fragment>
                        {editGradeId !== element.id ? (
                                                      
                    <tr> 
                      {/*}  <td>{element.id}</td>
                        <td>{element.idStudent}</td>*/}
                        <td>{element.date}</td>
                        <td>{element.grade}</td>
                        <td>{element.note}</td>
                        <td>{/*<button onClick={()=>handleDeleteGradeClick(element.id)}>delete</button> */}
                        <button onClick={(event)=>handleEditGradeClick(event,element)}>update</button></td>
                    </tr>
                        ): (
                          <tr>{/*  <td>{element.id}</td>
                       <td>{element.id}</td>
                        <td>{element.idStudent}</td> */}
                         <td style={{width:'200px'}}> {element.date}</td>
                        <td style={{width:'200px'}}> 
                               <select style={{width:'30px'}} value={element.grade} name='grade' onChange={handleEditFormGradeChange} > 
                                  <option  value="1">1</option>
                                  <option  value="2">2</option>
                                  <option  value="3">3</option>
                                  <option  value="4">4</option>
                                  <option  value="5">5</option>
                                </select>
                        </td>
                        <td style={{width:'200px'}}>
                          <textarea style={{width:"250px", resize:"none"}} type="text" name="note"  required="required"  rows="4" cols="50"  value={editFormGradeData.note}
                      onChange={handleEditFormGradeChange}/></td>
                       <td><input type ="submit" value='save'/>
                        <input type='button' onClick={()=>handleDeleteGradeClick(element.id)} value='delete' />
                        <input type='button' onClick={handleCancelGradeClick}  value="cancel"/></td>
                    </tr>


                        )}
                        </Fragment>

                      }
                    </Fragment>

          ))}
                </tbody>

              </table>
          </form>
      </div>
      
    </>

  )
}
