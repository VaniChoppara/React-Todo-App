var express=require("express");
var cors=require("cors");
var mongoClient=require("mongodb").MongoClient;

var conString="mongodb://127.0.0.1:27017";

var app=express();


app.use(cors());
// needed for post/put/delete to parser string to json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/register-user", (req, res)=>{
    var user={
        UserId: req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    };
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("users").insertOne(user).then(()=>{
            console.log("user register");
            res.end();
        });
    }) ;
});


app.get("/get-users", (req, res)=>{
       mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("users").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    }) ;
});

app.post("/add-task", (req,res)=>{
    var task= {
        Appointment_Id: parseInt(req.body.Appointment_Id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("appointments").insertOne(task).then(()=>{
            console.log("Task Inserted");
            res.end();
        });
    });
});


app.get("/view-tasks/:user_id", (req,res)=>{
   
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("appointments").find({UserId:req.params.user_id}).toArray().then((tasks)=>{
            res.send(tasks);
            res.end();
        });
    });
});


app.get("/view-task/:appointment_id", (req,res)=>{
   
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("appointments").find({Appointment_Id:parseInt(req.params.appointment_id)}).toArray().then((task)=>{
            res.send(task);
            res.end();
        });
    });
});


app.put("/edit-task/:appointment_id", (req,res)=>{
    var task= {
        Appointment_Id: parseInt(req.body.Appointment_Id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("appointments").updateOne({Appointment_Id:parseInt(req.params.appointment_id)},{$set:task}).then(()=>{
            console.log("Task Updated");
            res.end();
        });
    });
});

app.delete("/delete-task/:appointment_id", (req,res)=>{
   
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("react-todo");
        database.collection("appointments").deleteOne({Appointment_Id:parseInt(req.params.appointment_id)}).then(()=>{
            console.log("Task Deleted");
            res.end();
        });
    });
});


app.listen(5050);
console.log("http://127.0.0.1:5050/");