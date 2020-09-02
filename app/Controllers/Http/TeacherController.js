'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator  = use('Validator')
const Teacher = use('App/Models/Teacher')

function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number)))
    return {error:`param: ${number} is not supported, please use number type param instead`}
    // return {status:200 , error:undefined , data:teacher}
    // throw new Error(`param: ${number} is not supported, please use number type param instead`) ส่งerror500หน้าบ้านพัง
    return {}
}

class TeacherController {
    async index({request}) {
        const {references = undefined} = request.qs

        const teachers = Teacher.query()
        if(references) {
            const extractedReferences = references.split(",")
            teachers.with(extractedReferences)
        }
        return {status:200 , error:undefined , data:await teachers.fetch()}
    }
    async show({ request }) {
        const { id } = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        const teacher = await Database
            .select('*')
            .from('teachers')
            .where('teacher_id',id)
            .first()

        return {status:200 , error:undefined , data:teacher || {}}
    }

    async store({request}) {
        const {first_name , last_name , email , password} = request.body

        const rules = {
            first_name: 'required',
            last_name:'required',
            email: 'required | email | unique:teachers,email',
            password:'required|min:8'
        }

        const validation = await Validator.validateAll(request.body , rules)

        if(validation.fails())
            return {status:422 , error:validation.messages() , data:undefined}

        // const missingKeys = []
        // if(!first_name)
        //     missingKeys.push('first_name')
        // if(!last_name)
        //     missingKeys.push('last_name')
        // if(!email)
        //     missingKeys.push('email')
        // if(!password)
        //     missingKeys.push('password')

        // new RegExp("hello","gi").test("hello world") //ไม่นิยมใช้
        // new RegExp(/hello/gi).test('hello World')
        // (/hello/gi).test('hello world')

        // if(missingKeys.length)
            // return {status:422 , error: `${missingKeys} is missing` , data:undefined}

        const hashedPassword = await Hash.make(password)

        const teacher = await Database
            .table('teachers')
            .insert({first_name,last_name,email,password:hashedPassword})

        return {status:200,error:undefined,data:{first_name,last_name,email}}
    }
    async update({request}) {
        const {body , params} = request //เท่ากับสองตัวล่าง
        //const body = request.body
        //const param = request.param

        const {id} = params
        const {first_name , last_name , email} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        const teacherID = await Database
            .table('teachers')
            .where({teacher_id : id})
            .update({first_name , last_name , email})

        const teacher = await Database
            .table('teachers')
            .where({teacher_id:id})
            .first()

        return {status:200 , error:undefined , data:teacher}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}
        
        await Database
            .table('teachers')
            .where({teacher_id:id})
            .delete()
        
        return {status:200 ,error:undefined, data: {message : 'success'}}
    }
}

module.exports = TeacherController
