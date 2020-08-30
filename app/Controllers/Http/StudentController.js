'use strict'

const Database = use('Database')
const Hash = use('Hash')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class StudentController {
    async index() {
        const students = await Database.select('*').from('students')

        return students
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const students = await Database
            .select('*')
            .from('students')
            .where('student_id',id)
            .first()

        return {status:200 , error:undefined , data:students || {}}
    }
    async store({request}) {
        const {first_name,last_name,email,group_id,password} = request.body

        const missingKeys = []
        if(!first_name)
            missingKeys.push('first_name')
        if(!last_name)
            missingKeys.push('last_name')
        if(!email)
            missingKeys.push('email')
        if(!group_id)
            missingKeys.push('group_id')
        if(!password)
            missingKeys.push('password')

        if(missingKeys.length)
            return {status:500 , error:`${missingKeys} is missing` , data:undefined}
        
            const HashedPassword = await Hash.make(password)

        const students = await Database
            .table('students')
            .insert({first_name,last_name,email,group_id,password:HashedPassword})

        return {status:200 , error:undefined , data:{first_name,last_name,email,group_id}}
    }
}

module.exports = StudentController
