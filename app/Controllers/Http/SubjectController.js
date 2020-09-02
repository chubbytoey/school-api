'use strict'
const Database = use('Database')
const Validator = use('Validator')
const Subject = use('App/Models/Subject')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number)))
    return {error:`param: ${number} is not supported, please use number type param instead`}

    return {}
}
class SubjectController {
    async index({request}) {
        // const subjects = await Database.select('*').from('subjects')
        const {references = undefined} = request.qs

        // let subjects = await Database.table('subjects')
        const subjects = Subject.query()

        if(references) {
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }

        //console.log(queryString)// ดูqueryหลังref
        //console.log(Object.keys) // ไว้ดูว่ามันส่งค่าไรออกมาบ้าง

        return {status:200,error:undefined,data:await subjects.fetch()}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const subject = await Subject.find(id)
        console.log(subject)
        // const subject = await Database
        //     .select('*')
        //     .from('subjects')
        //     .where('subject_id',id)
        //     .first()

        return {status:200 , error:undefined , data:subject || {}}
    }
    async store({request}) {
        const {title} = request.body

        const rules = {
            title : 'required'
        }

        const validation = await Validator.validateAll(request.body , rules)

        if(validation.fails())
        return {status:422 ,error:validation.messages() , data:undefined}
        
        // const subjects = await Database
        //     .table('subjects')
        //     .insert({title})

        // const subject = new Subject();
        // subject.title = title;
        // subject.teacher_id = teacher.id;
        // await subject.save()

        const subject =await Subject.create({title})

        return {status:200 , error:undefined , data:title}   
    }
    async update({request}) {
        const {body,params} = request
        const {id} = params
        const {title} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        const subjectID = await Database
            .table('subjects')
            .where({subject_id:id})
            .update({title})
        
        const subject = await Database
            .table('subjects')
            .where({subject_id:id})
            .first()

        return {status:200 , error:undefined , data:subject}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('subjects')
            .where({subject_id:id})
            .delete()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
    async showTeacher({request}) {
        const {id} = request.params
        const subject = await Database
            .table('subjects')
            .where({subject_id:id})
            .innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
            .first()

        return {status:200 , error:undefined , data:subject || {}}
    }
}

module.exports = SubjectController
