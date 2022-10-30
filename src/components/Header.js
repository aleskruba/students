import React from 'react'

export const Header = ({today, numberOfStudents}) => {
  return (
    <>
     Today is {today.toDateString() } <br/>
    {numberOfStudents == 0  &&   
      <pre> There is no student in this class. </pre>
    }
      {numberOfStudents == 1  &&
      <pre> There is just 1 student in this class. </pre>
    }
      {numberOfStudents > 1  &&
      <pre> There are {numberOfStudents} students in this class. </pre>
    }
    <div/>
    </>
  )
}
