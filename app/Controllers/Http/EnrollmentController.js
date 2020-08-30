'use strict'

const Database = use('Database')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class EnrollmentController {
    async index() {
        const enrollment = await Database.table('enrollments')
        return enrollment
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
        const {mark,mark_date,student_id,subject_id} = request.body

        const missingKeys =[]
        
        if(!mark)
            missingKeys.push('mark')
        if(!mark_date)
            missingKeys.push('mark_date')
        if(!student_id)
            missingKeys.push('student_id')
        if(!subject_id)
            missingKeys.push('subject_id')

        if(missingKeys.length) 
        return {status:422 , error: `${missingKeys} is missing` , data:undefined}

        const enrollments = await Database
            .table('enrollments')
            .insert({mark,mark_date,student_id,subject_id})
        return {status:200 , error:undefined , data:{mark,mark_date,student_id,subject_id}}
    }
}

module.exports = EnrollmentController
