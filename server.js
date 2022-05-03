const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
import path from 'path';

const app = express();
//mongodb+srv://admin-omar:test123@cluster0.po4rf.mongodb.net/cookBookDB
mongoose.connect("mongodb+srv://admin-omar:test123@cluster0.po4rf.mongodb.net/cookBookDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(fileUpload());

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  content: String,
  ingredients: { type : Array , "default" : [] },
  imageName: String
  });

async function getRecipes(){

  const Recipe = mongoose.model("Recipe", recipeSchema);
  
  return await Recipe.find({},{_id:false, __v:false});
 
}

app.get('/getData',async (req,res) => {
 
  res.json( await getRecipes());
});




app.post('/addRecipe',(req,res)=>{
  const Recipe = mongoose.model("Recipe", recipeSchema);

  try{
  const recipe = new Recipe ({
    title: req.body.title,
    ingredients: req.body.ingredients,
    content: req.body.content,
    imageName: req.body.imageName
  });
  recipe.save();
}
catch(err){
  console.log(err)
  res.send(err);
}

  res.json({success: 'success'});
});

app.delete("/deleteRecipe/:title",async (req,res)=>{
  const Recipe = mongoose.model("Recipe", recipeSchema);
  deleteCheck = await Recipe.deleteOne({ title: req.params.title });
  if(deleteCheck.ok==1){
    if(deleteCheck.deletedCount==1){
      res.send( "Success");
    }else{
      res.send( "Not Found");
    }
  }else{
    res.send( "ERR");
  }
});

app.put("/updateRecipe/:title",async (req,res)=>{
  console.log(req.params.title);
  const Recipe = mongoose.model("Recipe", recipeSchema);

  
     Recipe.updateOne({title: req.params.title},{
      title: req.body.title,
      ingredients: req.body.ingredients,
      content: req.body.content,
      imageName: req.body.imageName
    },
    (err) =>{console.log(err);}
    );
    
  
  
    res.send("success");
  
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

let port = process.env.PORT;
if(port == null || port==""){
  port= 5000;
}


app.listen(port, () => console.log('Server Started...'));
