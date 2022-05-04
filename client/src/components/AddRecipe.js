import React, {useState} from "react";
import axios from 'axios';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../firebase";


function AddRecipe(props){
    const [recipe, setRecipe] = useState({
        title: "",
        ingredients: [],
        content: "",
        image: {}
    });
    const [ingredient, setIngredient] = useState("");
    
    function addIngredient(e) {
        e.preventDefault();
        setRecipe(prevRecipe =>{
            return{
                ...prevRecipe,
                ingredients: [ ...prevRecipe.ingredients ,ingredient ]
            };
        });
        setIngredient("")
        
    }

    function handleChangeIngredient(event){
        event.preventDefault();
        setIngredient(event.target.value);
       
    }

    function handleChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        setRecipe(prevRecipe =>{
            return{
                ...prevRecipe,
                [name]: value
            };
        });
       
    }

    function uploadImage(event){
        event.preventDefault();
        let img = document.getElementById('displayImage');
	    img.src = window.URL.createObjectURL(event.target.files[0]);
        setRecipe(prevRecipe =>{
            return{
                ...prevRecipe,
                image : event.target.files[0]
            };
        });
        
    }

    async function addRecipe(e){
        
        e.preventDefault(); 

        let imgName = recipe.title.replace(/\s/g, '') + "." + recipe.image.name.split(".")[1];

        const imageRef = ref(storage, `images/${imgName}`);
        console.log(imageRef);
        uploadBytes(imageRef,recipe.image).then(async (snapshot) => {
                const res = await axios.post('/addRecipe', {
                    title: recipe.title,
                    ingredients: recipe.ingredients,
                    content: recipe.content,
                    imageName: imgName
              })
              .then(()=>{
                props.OnAdd()
              })
          });
     
       
    }

async function removeingredient(e){
    e.preventDefault();
    console.log(e.target.id)
    let ing = recipe.ingredients.filter((ingredient,index) => {
        return index != e.target.id; 
});

setRecipe(prevRecipe =>{
    return{
        ...prevRecipe,
        ingredients: ing
    };
});


}

function exitAdd(){
    props.OnAdd()
}

    return (
        <div className = "container">
            <form  onSubmit={addRecipe}>
                <h2>Title</h2>
                <input 
                    name="title"
                    onChange={handleChange}
                
                />
                <h2>ingredients</h2>
                <input 
                    name="Ingredient"
                    onChange={handleChangeIngredient}
                    value={ingredient}
                />
                <button onClick={addIngredient}>+</button>
                <div >
                {recipe.ingredients.map((displayIngrediant,index) => {
                    return(
                        <div key={index} className= "ingredients">
                        <p >{displayIngrediant}</p>
                        <button key={index} id={index} onClick={removeingredient}>X</button>
                        </div>
                    );
                })}
                </div>
                <input 
                name= 'image'
                type='file' 
                accept='image/png, image/jpeg'    
                onChange={uploadImage}           
                />
                <img id="displayImage" width='200'/>
                <h2>Recipe</h2>
                <textarea
                    name = "content"
                    type = "text"
                    onChange={handleChange}
                />
                <input
                type='submit'
                value='Upload'
                />
                <button onClick={exitAdd}>
                    exit
                </button>
                            
            </form> 
        </div>
    );
}

export default AddRecipe