//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose=require("mongoose")
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Akshay:Ironman%40sunny5@cluster0.y1mc1sd.mongodb.net/test",{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('succes')
    }
})

const itemsschema={
    name:String
}

const Item=new mongoose.model("Item",itemsschema)

const item1=new Item({
  name:"hello"

})
const item2=new Item({
  name:"welcome"

})
const item3=new Item({
  name:"excuseme"

})

const arr=[item1,item2,item3]






app.get("/", function(req, res) {
  Item.find({},function(err,result){
    if(result.length==0){
      Item.insertMany(arr,function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log("no-error in adding ")
  }
});
res.redirect("/")

    }
    else{
      res.render("list", {listTitle: "Today", newListItems: result});
    }
    

  })
  


  

});

app.post("/", function(req, res){

  const itemname = req.body.newItem;
  const newitem=new Item({
    name:itemname
  })
  newitem.save();
  res.redirect("/");

  })

app.post("/del",function(req,res){
  const del=(req.body.checkbox)
  Item.deleteOne({name:del},function(err){
    if (err){
      console.log(err)
    }
    else{
      console.log("deleted succesfully ")
    }
  })
  res.redirect("/")
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
