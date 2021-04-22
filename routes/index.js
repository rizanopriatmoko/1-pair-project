const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

const middleware = (req, res, next) => {
    if (req.session.isLogin) {
      next()
    } else {
      res.redirect('/')
    }
  }
  const middleware2 = (req, res, next) => {
    if (req.session.isLogin) {
    res.redirect('/users')
    } else {
      next()
    }
  }

router.get('/', middleware2, Controller.signIn)
router.post('/', middleware2, Controller.signInCheck)
router.get('/signUp', Controller.signUpForm)
router.post('/signUp', Controller.signUp)
router.get('/users',middleware, Controller.userList)
router.get('/users/:id/seeTasks',middleware, Controller.userSeeTasksForm)
router.post('/users/:id/seeTasks',middleware, Controller.userSeeTasks)
router.get('/tasks',middleware, Controller.taskList)
router.get(`/tasks/add`,middleware, Controller.taskAddForm)
router.post(`/tasks/add`,middleware, Controller.taskAdd)
router.get('/tasks/:id/edit',middleware, Controller.taskUpdateForm)
router.post('/tasks/:id/edit',middleware, Controller.taskUpdate)
router.get('/tasks/:id/editUser',middleware, Controller.taskUpdateFormUser)//untuk bukan admin
router.post('/tasks/:id/editUser',middleware, Controller.taskUpdateUser)//untuk bukan admin
router.get('/tasks/:id/delete',middleware, Controller.taskDelete)
router.get('/tasks/:id/seeUser',middleware, Controller.taskSeeUser)
router.get('/logout', Controller.logout)



module.exports = router