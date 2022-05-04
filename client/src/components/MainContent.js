import React, {useState, useEffect} from "react";
import AddRecipeButton from './AddRecipeButton';
import Recipe from './Recipe'
import AddRecipe from './AddRecipe'
import DetailedRecipe from "./DetailedRecipe";
import EditRecipe from "./EditRecipe";
import axios from 'axios';
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

function MainContent(){
    const [view, setView] = useState([0,-1]);
    const [recipes, setRecipes] = useState(null);
    
    let img ={};
    useEffect(() => {
        fetch('/getData')
        .then(res=>{    
            
            return res.json();
        }).then(data =>{
            let dataWithUrl = [];
            data.forEach(element => {
                let ImageUrl = "";
                
                getDownloadURL(ref(storage, `images/${element.imageName}`)).then( url => {
                    
                    setRecipes(prevRecipes => {
                        return[...prevRecipes, 
                            {...element,
                            ImageUrl: url
                           }];
                    });
                    
                });
              
               
            });

            setRecipes(dataWithUrl);
        })

        
       
    },[])


    

    function addView(){
        setView([1,-1]);
    }

    function addNewRecipe() {
        window.location.reload();
    }

    async function  deleteRecipe(id){

        let [deletedRecipe] = await recipes.filter((recipe,index) => {
            return index == id;
        });

        
        const imageRef = ref(storage, `images/${deletedRecipe.imageName}`);
        await deleteObject(imageRef)
        .then(async ()=>{
            await  axios.delete(`/deleteRecipe/${deletedRecipe.title}`)
            .then(()=>{
                window.location.reload();
            });
        });

       

        
        
        
        
    }

    function editRecipeSubmit(editedRecipe,id){
        window.location.reload();
    }

    function viewDetails(id){
        setView([2,id]);
    }

    function returnToFirstView(){
        setView([0,-1]);
    }

    function editView(id){
       
        setView([3,id])
    }

    return(
        <div className= "page-content">
            {view[0] === 0 && (
                <div>
                    <AddRecipeButton 
                        OnAdd = {addView}
                    />
                    {recipes && recipes.map((displayRecipe,index) => {
                        return(
                            <Recipe
                            key={index}
                            Id={index}
                            Title={displayRecipe.title}
                            Content={displayRecipe.content}
                            ImageName={displayRecipe.imageName}
                            ImageUrl={displayRecipe.ImageUrl}
                            OnDelete={deleteRecipe}
                            ViewDetails={viewDetails}
                            />
                        );

                    })}
                    
                    
                </div>
            )}

            {view[0] === 1 && (
                <div>
                    <AddRecipe
                        OnAdd={addNewRecipe}
                    />
                </div>
            )}

            {view[0] === 2 && (
                <div>
                    <DetailedRecipe 
                            Id={view[1]}
                            Title={recipes[view[1]].title}
                            Content={recipes[view[1]].content}
                            ImageName={recipes[view[1]].imageName}
                            ImageUrl={recipes[view[1]].ImageUrl}
                            Ingredients={recipes[view[1]].ingredients}
                            OnDelete={deleteRecipe}
                            OnExit={returnToFirstView}
                            OnEdit={editView}
                            
                    />
                </div>
            )}

            {view[0] === 3 && (
                <div>
                    <EditRecipe 
                            Id={view[1]}
                            Title={recipes[view[1]].title}
                            Content={recipes[view[1]].content}
                            ImageName={recipes[view[1]].imageName}
                            ImageUrl={recipes[view[1]].ImageUrl}
                            Ingredients={recipes[view[1]].ingredients}
                            OnEditSubmit={editRecipeSubmit}
                            Recipe={recipes[view[1]]}
                            OnExit={returnToFirstView}
                            
                    />
                </div>
            )}
        </div>
    );
}

export default MainContent;