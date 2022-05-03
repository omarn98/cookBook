import React from 'react';
import Header from './Header'
import MainContent from './MainContent'

function App() {
    return (
    <div>
        <Header />
        <MainContent />
 
    </div>
    );
}

export default App


            {/* {recipes.map((recipe,index) => {
                return (
                    <Recipe 
                        key = {index}
                        id = {index}
                        recipecontent = {recipe.recipeName}
                    />
                )
            })} */}