

const Header = (props) => {
    const {course} =  props
  
    return (
      
        <h2>{course}</h2>
       
     
    )
  }
  const Part  = (props) => {
   
    const {name, quantity} = props
  
    return (
      
       
        <p>
          {name} {quantity}
        </p>
       
       
    )
  }
  const Content  = (props) => {
   
    const {parts} = props
  
  
    const componentList = parts.map((part) => {
      let {name, exercises} = part
      return (
      <Part name = {name} quantity= {exercises} key = {name}/>
      )
    })
  
    return (
      
      <div>
       {componentList}
      </div>
       
       
       
       
       
    )
  }
  
  const Total  = (props) => {
    
    let {parts} = props
  
    let total = parts.reduce((prev, current) => {
      let exercises = current.exercises
      return prev + exercises
    },0)
  
    return (
      
        <p>Total of {total} exercises </p>
      
    )
  }
  
  function Course(props) {
    
    let {courses} = props
  
    let coursesListElements =  courses.map((course) => {
     return( <div key= {course.name}  >
    <Header course={course.name} />
  
    <Content parts={course.parts} />
  
  
    <Total parts={course.parts} />
  
  </div>)
    })
  
  
  
    return (
  
      <>
      <h1> Web development curriculum </h1> 
  
     {coursesListElements}
  </>
    )
  }


  export default Course