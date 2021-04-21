const Task = require("../models").Task
const User = require("../models").User
const UserTask = require("../models").UserTask

class Controller{
    static signIn(req, res){
        res.render('signIn')
    }
    static signUpForm(req, res){
        res.render('signUpForm')
    }
    static signUp(req, res){
        User.create({
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
        })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static userList(req, res){
        User.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
            .then((result) => {
                console.log(result)
                res.render('user', { result })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static userSeeTasksForm(req, res){
        let tempTask
        let temp
        Task.findAll()
        .then(data => {
            // console.log(data)
            tempTask = data
            return User.findByPk(+req.params.id,{
                include : Task
            })
        })
        .then( dataUser => {
            console.log(dataUser)
            temp = dataUser
            return UserTask.findAll({
                where: {
                    UserId : req.params.id
                }
            })
        })
        .then(result => {
            // console.log(result)
            res.render('userSeeTask', {temp, tempTask, result})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static userSeeTasks(req, res){
        UserTask.create({
            UserId: +req.params.id,
            TaskId: req.body.task
        })
        .then( () => {
            res.redirect(`/users/${req.params.id}/seeTasks`)
        })
        .catch( err => {
            res.send(err)
        })
    }
    static taskList(req, res){
        Task.findAll({
            order: [
                ['status', 'DESC']
            ]
        })
            .then((result) => {
                // console.log(result)
                res.render('task', { result })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static taskAddForm(req, res){
        res.render('taskForm')
    }
    static taskAdd(req, res){
        Task.create({
            name: req.body.name,
            status: req.body.status
        })
            .then((data) => {
                res.redirect('/tasks')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static taskUpdateForm(req, res){
        Task.findByPk(+req.params.id)
        .then((result) =>{
            res.render('taskUpdate', {result})
        })
        .catch ((err) => {
            res.render(err)
        })
    }
    static taskUpdate(req, res){
        Task.update({
            name: req.body.name,
            status: req.body.status,
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then((data) => {
                res.redirect('/tasks')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static taskDelete(req, res){
        let input = +req.params.id
        Task.destroy({
            where: {
                id: input
            }
        })
            .then((result) => {
                // console.log(result)
                res.redirect('/tasks')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static taskSeeUser(req, res){
        Task.findByPk(+req.params.id, {
            include: User
        })
        .then( result => {
            // console.log(result)
            res.render('taskSeeUser', {result})
        })
        .catch( err => {       
            res.send(err)
        })
    }
}

module.exports = Controller