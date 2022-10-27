const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const userRoutes=require('./routes/user');
const checkAuth=require('./middleware/check-auth');
const Task=require('./models/tasks');
const chatRoutes=require('./routes/chats');

const app = express();


mongoose.connect("mongodb+srv://vishal:nHfptVvnZAdNBJdF@cluster0-ense6.mongodb.net/Util?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
     "Origin,Authorization,X-Requested-With,content-type,Accept,append,delete,entries,foreach,get,has,keys,set,values"
     );
  res.setHeader("Access-Control-Allow-Methods",
     "POST,GET,DELETE,PATCH,PUT,OPTIONS"
   );
  next();
})

app.post("/api/tasks", checkAuth, (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    content: req.body.content,
    creator:req.userData.userId
  });
  console.log(task);
  task.save().then(createdTask => {
    res.status(201).json({
      message: "Task added successfully",
      taskId: createdTask._id
    });
  });
});

app.get("/api/tasks",  (req, res, next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.delete("/api/tasks/:id", checkAuth,(req, res, next) => {
  Task.deleteOne({ _id: req.params.id,creator:req.userData.userId }).then(result => {
    if(result.n>0){
      res.status(200).json({ message: "Post deleted!" });
    }else{
      res.status(405).json({ message : "not Authorized"});
    }
  });
});




app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);
module.exports = app;
