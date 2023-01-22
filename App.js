import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const[show,setShow] = useState('')
  const[ingredient,setIngredient] = useState('')
  const[calories,setCalories] = useState()
  const[totalCal, setTotalCal] = useState(0)
  
  useEffect(() => {
    setShow([<div className='textmsg'>{ingredient} {calories}</div>, show])
    setIngredient('')
  }, [totalCal])
  
  function handleChange(e) {
    setIngredient(e.target.value)
  }

  function handleKeyPress(e) {
    if (e.key == "Enter" && ingredient != '') {
      const myURL = new URL("https://api.edamam.com/api/food-database/v2/parser")
      myURL.searchParams.append('app_id', 'd693100d')
      myURL.searchParams.append('app_key', '18cd6d0386d9be9aef0395e23cf7cc1b')
      myURL.searchParams.append('ingr', ingredient)
      fetch(myURL, {
        "method" : "GET",
      })
      .then(response => (
         response.json()))
      .then(data => 
        {
          const food = data.parsed[0].food;
          const calories = food.nutrients.ENERC_KCAL
          setCalories(calories)
          setTotalCal(calories + totalCal)
        });
    }
  }

  return(
    <div>
      <input className='inputBox' value = {ingredient} onChange = {handleChange} onKeyDown = {handleKeyPress}></input>
      <div>{totalCal}</div>
      <div className='foods'>{show}</div>
    </div>
  )
}

export default App;
