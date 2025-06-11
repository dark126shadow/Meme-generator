import React, { useState } from 'react'
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsLists from './IngredientsLists';
import { HfInference } from '@huggingface/inference';
import { getRecipeFromMistral } from './ai';
function Main() {

    const [indgredients,setindgredients]= useState([]);
    const[recipe,setrecipe]=useState("");
    console.log('running');
  
    const indgredientlist= indgredients.map((item)=>(
         <li kety={item }>{item}</li>
    ))

    function handleonSubmit(formdata){
      
        const item = formdata.get("ingredient");
      
        setindgredients(previndgredients => [...previndgredients,item]);
        console.log(indgredients);
    };
    async function  getrecipe(){
     const recipeMarkdown= await getRecipeFromMistral(indgredients)
     setrecipe(recipeMarkdown);
    }
  
  return (
    <>
<div className="wrapper">


   <form action={handleonSubmit} >
    <input type="text" aria-label="add indgredient" placeholder="Oregaon etc" name="ingredient" />
    <button>+ Add ingredient</button>
   </form>
   {indgredientlist.length>0 && <IngredientsLists list = {indgredientlist} click={getrecipe} /> }
{ recipe  &&  <ClaudeRecipe recipe={recipe} />
}  
   </div>
    </>
  )
}


export default Main