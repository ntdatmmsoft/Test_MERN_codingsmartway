var express = require('express');
var router = express.Router();

// Model
let todoSchema = require('../models/todo.model');

router.route('/').get(function (req, res) {
    todoSchema.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
})

router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    todoSchema.findById(id, function (err, todo) {
        res.json(todo);
    });
});

router.route('/add').post(function (req, res) {
    let todo = new todoSchema(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({
                status: 'Added successfully',
                todos: todo
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: "Added failed"
            })
        });
});

router.route('/update/:id').post(function (req, res) {
    todoSchema.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: "Data is not found"
            })
        }
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json('Todo updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});
function getAll(collection) {
    return collection.find()
}

router.route('/delete/:id').delete((req, res) => {
    Promise.all([
        getAll(todoSchema)
    ]).then(
        function ([results]) {
            var todos = []
            for (let i = 0; i < results.length; i++) {
                if (results[i] && results[i].id !== req.params.id) {
                    todos.push(results[i])
                }
            }
            todoSchema.findByIdAndRemove(req.params.id, (error, data) => {
                if (error) {
                    res.status(500).json({
                        status: 'error',
                        code: 500,
                        message: "Failed to delete todos"
                    })
                }
                else {
                    res.json({
                        success: 'success',
                        todos: todos
                    })
                }
            })
        })

})


module.exports = router;