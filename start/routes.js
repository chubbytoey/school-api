'use strict'

const TeacherController = require('../app/Controllers/Http/TeacherController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {

  Route.resource('/teachers','TeacherController') //เท่ากับอันล่างทั้งหมด
  // Route.get('/teachers','TeacherController.index') //read
  // Route.get('/teachers/:id','TeacherController.show') //read
  // Route.post('/teachers','TeacherController.store') //create
  // Route.put('/teachers/:id','TeacherController.update')//replace all
  // Route.patch('/teachers/:id','TeacherController.update')//replace some
  // Route.delete('/teachers/:id','TeacherController.destroy')//delete

  Route.resource('/groups','GroupController')
  // Route.get('/groups','GroupController.index')
  // Route.get('/groups/:id','GroupController.show')
  // Route.post('/groups','GroupController.store') 

  Route.resource('/subjects','SubjectController')
  // Route.get('/subjects/:id/teacher','SubjectController.showTeacher')
  // Route.get('/subjects','/SubjectController.index')
  // Route.get('/subjects/:id','/SubjectController.show')
  // Route.post('/subjects','SubjectController.store')

  Route.resource('/students','StudentController')
  // Route.get('/students','StudentController.index')
  // Route.get('/students/:id','StudentController.show')
  // Route.post('/students','StudentController.store')

  Route.resource('/enrollments','EnrollmentController')
  // Route.get('/enrollments','EnrollmentController.index')
  // Route.get('/enrollments/:id','EnrollmentController.show')
  // Route.post('/enrollments','EnrollmentController.store')


}).prefix('api/v1')