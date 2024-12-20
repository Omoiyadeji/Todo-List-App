const Task = require('../models/Task')

exports.getTasks = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            console.error('User Not Authenticated')
            return res.redirect ('/users/login')
        }

        console.log('Authenticated User ID:', req.user.id)


        const tasks = await Task.find({user: req.user.id })
        console.log('Fetched Tasks From DB:', tasks)
        res.render ('tasks', {tasks, errorMessage: null })
    } catch (error) {
        console.error('Error Fetching Tasks:', error.message)
        res.render('tasks', {tasks: [], errorMessage: 'Error loading tasks.Please Try Again.'})
    }
}



exports.createTask = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            console.error('User Not Authenticated')
            return res.redirect('/users/login')
        }

        const {description} = req.body

        if (!description) {
            console.error('Task description missing')
            return res.render('tasks', {
                tasks: [],
                errorMessage: 'Task description is required'
            })
        }

        const task = await Task.create({description, user: req.user.id})
        console.log('Task Created successfully:', task)
        res.redirect('/tasks')
    } catch (error) {
       console.error('Error Creating Task:', error.message) 
       res.render('tasks', { tasks: [], errorMessage: 'Error Creating Task. Please Try Again.'})
    }
}



exports.updateTask = async (req, res, next) => {
    try {
        const { state } = req.body
        const validStates = ['pending', 'completed', 'deleted']

        if (!validStates.includes(state)) {
            console.error('Invalid Task State:', state)
            return res.status(400).json({ message: 'Invalid Task State'})
        }

        console.log('Updating Task ID:', req.params.id, 'to state:', state)
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {state},
            {new: true}
        )

        if (!task) {
            console.error('Task Not Found For Update')
            return res.status(404).json({ message: 'Task Not Found'})
        }

        console.log('Task Updated Successfully:', task)
        res.redirect('/tasks')
    } catch (error) {
        console.log('Error Updating Task:', error.message)
        res.render('tasks', {tasks: [], errorMessage: 'Error Updating Task. Please Try Again'})
    }
}



exports.deleteTask = async (req, res, next) => {
    try {
       console.log('Deleting Task ID:', req.params.id)
       
       const task = await Task.findByIdAndDelete(req.params.id)

       if (!task) {
        console.error('Task Not Found For Deletion')
        return res.status(404).json({ message: 'Task Not Found'})
       }

       console.log('Task Deleted Successfully:', task)
       res.redirect('/tasks')
    } catch (error) {
        console.error('Error deleting task:', error.message)
        res.render('tasks', { tasks: [], errorMessage: 'Error Deleting Task. Please Try Again.'})
    }
}