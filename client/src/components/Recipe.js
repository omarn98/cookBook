import React from "react";

function Recipe(props) {

    function handleClick(){
        props.OnDelete(props.Id)
    }

    function viewRecipeDetails(event){
        props.ViewDetails(props.Id)
    }

    return(
        <div className="recipe" >
        <div onClick={viewRecipeDetails}>
            <h2>{props.Title}</h2>
            <p>{props.Content.match(/.{1,50}/g)[0] + "..."}</p>
            <img src={props.ImageUrl} width='200' />
            </div>
            <button
                onClick={handleClick}
            >
                Delete
            </button>         
        </div>
    )
}

export default Recipe;