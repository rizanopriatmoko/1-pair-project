const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.signIn)
router.get('/signUp', Controller.signUpForm)
router.post('/signUp', Controller.signUp)
router.get('/users', Controller.userList)
router.get('/users/:id/seeTasks', Controller.userSeeTasksForm)
router.post('/users/:id/seeTasks', Controller.userSeeTasks)
router.get('/tasks', Controller.taskList)
router.get(`/tasks/add`, Controller.taskAddForm)
router.post(`/tasks/add`, Controller.taskAdd)
router.get('/tasks/:id/edit', Controller.taskUpdateForm)
router.post('/tasks/:id/edit', Controller.taskUpdate)
router.get('/tasks/:id/delete',Controller.taskDelete)
router.get('/tasks/:id/seeUser',Controller.taskSeeUser)



module.exports = router