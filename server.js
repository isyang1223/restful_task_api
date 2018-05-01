// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');

app.use(express.static(path.join(__dirname, './AngularApp/dist')));

// exports.index = function (req, res) {
//     res.render('index', { moment: moment });
// }
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;


var TaskSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title cannot be empty"] },
    desc: { type: String, required: [true, "Description cannot be empty"]},
    completed: { type: Boolean, default: false}
}, { timestamps: true });


// var UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'User'



// Setting our Static Folder Directory

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request



app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: tasks })
        }
    })
})

app.post('/task', function (req, res) {
    console.log("POST DATA");
    var task = new Task();
    task.title = req.body.title
    task.desc = req.body.desc

    task.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("12425t3tsagfasd", task.errors);
            // respond with JSON
            
            res.json({ message: "Error", error: task.errors })

        }

        else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a task!');
            res.json({ message: "Success", data: task })
        }
    })
})

app.delete('/tasks/remove/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Task.remove({_id: req.params.id }, function (err) {


        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })

        }
        else { // else console.log that we did well and then redirect to the root route

            console.log('successfully removed a task!');
            res.json({ message: "Success" })
        }
    })
})

app.get('/tasks/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Task.findOne({_id: req.params.id }, function (err, task) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: task })
        }
    })
})

app.put('/task/edit/:id', function (req, res) {
    
    Task.findOne({ _id: req.params.id }, function (err, task) {
        if (task){
        task.title = req.body.title;
        task.desc = req.body.desc;
        task.completed = req.body.completed;

        task.save(function (err) {

        if (err) {
            console.log("SDSAFAGDGDFGDFGDSFGSDFGS", task.errors);
            
            // respond with JSON
            res.json({ message: "Error", error: task.errors })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: task })
        }
    })
    }
    })

})



// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})