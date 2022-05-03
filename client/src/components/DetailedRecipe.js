import React from "react";

function DetailedRecipe(props){
    function edit(){
        props.OnEdit(props.Id)
    }

    function exitView(){
        props.OnExit()
    }

    function deleteDetailedRecipe(){
        props.OnDelete(props.Id)
    }

    return(
    <div className="edit-recipe">
        <h2>{props.Title}</h2>
            {props.Ingredients.map((displayIngrediant,index) => {
                return(
                    <p key={index}>{displayIngrediant}</p>
                );
            })}
            <p>{props.Content}</p>
            <img src={props.ImageUrl} width='200' />
            <button onClick={edit}>Edit</button>
            <button onClick={deleteDetailedRecipe}>delete</button>
            <button onClick={exitView}>exit</button>
    </div>
    );
};

export default DetailedRecipe;