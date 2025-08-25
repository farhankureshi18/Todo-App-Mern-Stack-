const Todo = require('../Models/todoSchema');

// CREATE
const createTodo = (req, res) => {
    console.log('in create todo');
    let todos = new Todo({
        task: req.body.task,
        desc: req.body.desc,
        isCompleted: req.body.isCompleted
    });
    todos.save()
        .then(() => res.send({ message: 'Todo created successfully' }))
        .catch(err => res.send({ message: 'Error creating todo', err }));
};

// READ ALL
const getTodo = (req, res) => {
    Todo.find()
        .then(data => res.send({ data }))
        .catch(err => res.send({ message: 'Error fetching todos', err }));
};

// READ ONE BY ID
const getTodoId = (req, res) => {
    Todo.findOne({ _id: req.query._id })
        .then(data => res.send({ data }))
        .catch(err => res.send({ err }));
};

const findByIdTodo = (req, res) => {
    Todo.findById(req.query._id)
        .then(result => res.send({ result }))
        .catch(err => res.send({ msg: 'Error', err }));
};

// UPDATE
const updateTodo = (req, res) => {
    Todo.updateOne({ _id: req.query._id }, req.body)
        .then(data => res.send({ data }))
        .catch(err => res.send({ err }));
};

const Udbfindupdate = (req, res) => {
    Todo.findOneAndUpdate({ _id: req.query._id }, req.body)
        .then(data => res.send({ data }))
        .catch(err => res.send({ err }));
};

const UdbFindIdAndUpd = (req, res) => {
    Todo.findByIdAndUpdate(req.query._id, req.body, { new: true })
        .then(data => res.send({ data }))
        .catch(err => res.send({ err }));
};

// UPDATE MANY
const updateManyTodo = (req, res) => {
    Todo.updateMany({ task: req.query.task }, req.body)
        .then(val => res.send({ data: val }))
        .catch(err => res.send({ msg: 'Not Found', err }));
};

// DELETE
const deleteTodo = (req, res) => {
    Todo.deleteOne({ _id: req.query._id })
        .then(data => res.send({ data }))
        .catch(err => res.send({ err }));
};

module.exports = {
    createTodo,
    getTodo,
    getTodoId,
    updateTodo,
    deleteTodo,
    findByIdTodo,
    Udbfindupdate,
    updateManyTodo,
    UdbFindIdAndUpd
};
