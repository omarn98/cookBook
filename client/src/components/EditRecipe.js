import React,{useState} from "react";
import axios from 'axios';
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytes} from "firebase/storage";
import { storage } from "../firebase";


function EditRecipe(props){
    
    const [recipe, setRecipe] = useState(props.Recipe);
    const [ingredient, setIngredient] = useState("");
    const [image, setImage] = useState(null);
    
    
    function addIngredient() {

        setRecipe(prevRecipe =>{
            return{
                ...prevRecipe,
                ingredients: [ ...prevRecipe.ingredients ,ingredient ]
            };
        });
        setIngredient("")
        
    }

    function handleChangeIngredient(event){
        setIngredient(event.target.value);
       
    }

    function handleChange(event){
        const { name, value } = event.target;
        setRecipe(prevRecipe =>{
            return{
                ...prevRecipe,
                [name]: value
            };
        });
       
    }

    function uploadImage(event){
        
        let img = document.getElementById('displayImage');
	    img.src = window.URL.createObjectURL(event.target.files[0]);
        setImage(event.target.files[0]);
        
    }

    async function addRecipe(){
        let imgName
        if(image != null){
            imgName = recipe.title.replace(/\s/g, '') + "." + image.name.split(".")[1];
        }else{
            imgName = recipe.title.replace(/\s/g, '') + "." + props.ImageName.split(".")[1];
        }
        
        console.log(imgName);
        if(image != null || props.ImageName !=imgName){
            const deleteImageRef = ref(storage, `images/${props.ImageName}`);
            await deleteObject(deleteImageRef);
            
            

            const addImageRef = ref(storage, `images/${imgName}`);

            await uploadBytes(addImageRef,image).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
        
        }

        const res = await axios.put(`/updateRecipe/${props.Title}`, {
            title: recipe.title,
            ingredients: recipe.ingredients,
            content: recipe.content,
            imageName: imgName
        });


        props.OnEditSubmit();
        
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

    function exitEdit(){
        window.location.reload();
    }
    

    return (
        <div className="edit-recipe edit">
        <h2>Title</h2>
            <input 
                name="title"
                onChange={handleChange}
                value={recipe.title}
               
            />
            <h2>ingredients</h2>
            <input 
                name="ingredient"
                onChange={handleChangeIngredient}
                value={ingredient}
            />
            <button onClick={addIngredient}>+</button>
            
            {recipe.ingredients.map((displayIngrediant,index) => {
                return(
                        <div key={index} className= "ingredients">
                        <p >{displayIngrediant}</p>
                        <button key={index} id={index} onClick={removeingredient}>X</button>
                        </div>
                    );
            })}
            <input 
            name= 'image'
            type='file' 
            accept='image/png, image/jpeg'    
            onChange={uploadImage}           
            />
            <img id="displayImage" width='200' src={props.ImageUrl}/>
            <textarea
                name = "content"
                type = "text"
                onChange={handleChange}
                value= {recipe.content}
            />
            <button
                onClick={addRecipe}
            >
                Submit
            </button>    
            <button
                onClick={exitEdit}
            >
                Exit
            </button>         
        </div> 
    );
        }
export default EditRecipe;