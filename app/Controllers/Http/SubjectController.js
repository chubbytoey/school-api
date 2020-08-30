'use strict'
const Database = use('Database')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number)))
    return {error:`param: ${number} is not supported, please use number type param instead`}

    return {}
}
class SubjectController {
    async index() {
        const subjects = await Database.select('*').from('subjects')

        return subjects
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const subject = await Database
            .select('*')
            .from('subjects')
            .where('subject_id',id)
            .first()

        return {status:200 , error:undefined , data:subject || {}}
    }
    async store({request}) {
        const {title,teacher_id} = request.body

        const missingKeys = []

        if(!title) missingKeys.push('title')
        if(!teacher_id) missingKeys.push('teacher_id')

        if(missingKeys.length)
            return {status:500 , error:`${missingKeys} is missing` ,data:undefined}
        
        const subjects = await Database
            .table('subjects')
            .insert({title,teacher_id})

        return {status:200 , error:undefined , data:subjects}
        
    }
}

module.exports = SubjectController
