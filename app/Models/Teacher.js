'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Teacher extends Model {
    static get primaryKey() {
        return 'teacher_id'
    }
    subject() {
        return this.hasMany('App/Models/Subject')
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
}

module.exports = Teacher
