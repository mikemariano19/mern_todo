const express = require('express')
const {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoControllers')

const router = express.Router()

// GET all todos
router.get('/', getTodos)

// GET single todo
router.get('/', getTodo)

// POST a new todo
router.post('/', createTodo)

// DELETE a todo
router.delete('/', deleteTodo)

// UPDATE a todo
router.update('/', updateTodo)

module.exports = router