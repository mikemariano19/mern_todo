const Todo = require('../models/models')
const mongoose = require('mongoose')

// get all todo items
const getTodos = async (req, res) => {
    const todo = await Todo.find({}).sort({createdAt: -1})
    res.status(200).json(todo)
}

// get single todo item
const getTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such todo item'})
    }

    const todo  = await Todo.findById(id)

    if(!todo) {
        return res.status(404).json({error: 'No such todo item'})
    }
    
    res.status(200).json(todo)
}

// create a new todo item
const createTodo = async (req, res) => {
    const { title } = req.body

    // add to database
    try{
        const todo = await Todo.create({title})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a todo item
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such todo item'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    res.status(200).json(todo)
}

// update a todo item
const updateTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such todo item'})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!todo){
        return res.status(404).json({error: 'No such todo item'})
    }

    res.status(200).json(todo)
}



module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}