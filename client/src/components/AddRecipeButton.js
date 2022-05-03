import React from 'react';

function AddRecipeButton(props) { 

    function handleClick(){
        props.OnAdd()
    }

    return(
        <div >
            <button className='add-recipe' onClick={handleClick}>+</button>
        </div>
        
    );
}

export default AddRecipeButton;