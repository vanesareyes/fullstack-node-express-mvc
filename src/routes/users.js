const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const fs = require('fs')

let userValidation = [check('email').isEmail(), check('password').isLength({ min: 6, max: 12 }).withMessage('El password debe tener entre 6 y 12 caracteres')]

router.get('/login', function(req, res) {
    res.render('login')
})

router.get('/register', function(req, res) {
    //Mostramos el formulario de registro
    res.render('register')
})

router.post('/register', userValidation, function(req, res) {
    //si hay errores redirigimos a 'users/register'mostrando los errores
    //guardamos el usuario validado en el json
    //redirigir a la pagina de login
    let result = validationResult(req)

    if (result.isEmpty()) {
        return res.render('register', {
                errors: result.errors,
                data: req.body
            }) //envio la informacion que ya existia, ej email
    }

    let users = fs.readFileSync('src/data/users.json', { encoding: 'utf-8' })
    users = JSON.parse(users)
    users.push(req.body)
    users = JSON.stringify(users)
    fs.writeFileSync('src/data/users.json', users)
        // Aca guardamos los datos enviados por el formulario
        //console.log(req.body,errors)   //dentro de req en body esta toda la informacion recibida por post
        //res.end('recibido!')

    res.redirect(301, '/users/login')
})

router.post('/login', userValidation, function(req, res) {
    let result = validationResult(req)

    if (result.isEmpty()) {
        return res.render('login', {
                errors: result.errors,
                data: req.body
            }) //envio la informacion que ya existia, ej email
    }
    // Guardar en sesion
    req.session.user = {
        id: 1,
        email: 'john@doe.com',
    }

    res.redirect(301, '/users/welcome')
})

router.get('/welcome', function(req, res) {
    res.end('bienvenido ' + req.session.user.email + '!')
})

router.get('/color', function(req, res) {
    res.render('color')
})

router.post('/color', function(req, res) {
    let color = req.session.color
    res.render('color')

})

module.exports = router