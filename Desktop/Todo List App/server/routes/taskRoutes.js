const express = require('express')
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController')
const authenticate = require('../middlewares/authMiddleware')
const router = express.Router()



router.use(authenticate)


router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router