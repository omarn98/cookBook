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

    return (
        <div>
            <input 
                name="title"
                onChange={handleChange}
                value={recipe.title}
               
            />
            <input 
                name="ingredient"
                onChange={handleChangeIngredient}
                value={ingredient}
            />
            <button onClick={addIngredient}>+</button>
            <input 
            name= 'image'
            type='file' 
            accept='image/png, image/jpeg'    
            onChange={uploadImage}           
            />
            {recipe.ingredients.map((displayIngrediant,index) => {
                return(
                    <p key={index}>{displayIngrediant}</p>
                );
            })}
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
                submit
            </button>           
        </div> 
    );
        }
export default EditRecipe;