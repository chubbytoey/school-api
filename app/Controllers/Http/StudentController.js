'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator  = use('Validator')
const Student = use('App/Models/Student')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class StudentController {
    async index({request}) {
        const {references = undefined} = request.qs

        const student = Student.query()

        if(references) {
            const extractedReferences = references.split(",")
            for(const value of extractedReferences) 
                student.with(value)
        }
        return {status:200 , error:undefined , data:await student.fetch()}
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
        const {first_name,last_name,email,password} = request.body

        const rules = {
            first_name : 'required',
            last_name : 'required',
            email : 'required | email | unique:students,email',
            password : 'required | min:8'
        }

        const Validation = await Validator.validateAll(request.body , rules)

        if(Validation.fails())
        return {status:422 , error:Validation.messages(),data:undefined}

        const HashedPassword = await Hash.make(password)

        const students = await Database
            .table('students')
            .insert({first_name,last_name,email,password:HashedPassword})

        return {status:200 , error:undefined , data:{first_name,last_name,email}}
    }
    async update({request}) {
        const {body , params} = request

        const {id} = params
        const {first_name,last_name,email} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const studentID = await Database
            .table('students')
            .where({student_id:id})
            .update({first_name,last_name,email})

        const student = await Database
            .table('students')
            .where({student_id:id})
            .first()

        return {status:200 , error:undefined , data:student}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('students')
            .where({student_id:id})
            .delete()

        const student = await Database
            .table('students')
            .where({student_id:id})
            .first()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = StudentController
