'use strict'

const Database = use('Database')
const Validator  = use('Validator')
const Enrollment = use('App/Models/Enrollment')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class EnrollmentController {
    async index({request}) {
        const {references = undefined} = request.qs

        const enrollment = Enrollment.query()

        if(references) {
            const extractedReferences = references.split(",")
            for(const value of extractedReferences) {
                enrollment.with(value)
            }
        }

        return {status:200 , error:undefined , data:await enrollment.fetch()}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
            return {status:500 , error: ValidatedValue.error , data:undefined}

        const enrollment = await Database
            .select('*')
            .from('enrollments')
            .where('enrollment_id',id)
            .first()

        return {status:200 , error: undefined , data: group || {}}
    }
    async store({request}) {
        const {mark} = request.body
        const rules = {
            mark : 'required'
        }
        const Validation = await Validator.validateAll(request.body , rules)
        if(Validation.fails())
        return {status:422 , error:Validation.fails , data:undefined}
        // if(!mark)
        // return {status:422 , error: `mark is missing` , data:undefined}

        const enrollments = await Database
            .table('enrollments')
            .insert({mark})
        return {status:200 , error:undefined , data:{mark}}
    }
    async update({request}) {
        const {body,params} = request
        const {id} = params
        const {mark} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const enrollmentID = await Database.table('enrollments').where({enrollment_id:id}).update({mark})
        const enrollment = await Database.table('enrollments').where({enrollment_id:id}).first()

        return {status:200 , error:undefined , data:enrollment}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database.table('enrollments').where({enrollment_id:id}).delete()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = EnrollmentController
