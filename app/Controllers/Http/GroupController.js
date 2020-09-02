'use strict'

const { group } = require("@adonisjs/framework/src/Route/Manager")

const Database = use('Database')
const Validator  = use('Validator')
const Group = use('App/Models/Group')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class GroupController {
    async index({request}) {
        const {references = undefined} = request.qs
        const groups = Group.query()

        if(references) {
            const extractedReferences = references.split(",")
            groups.with(extractedReferences)
        }

        return {status:200 , error:undefined , data: await groups.fetch()}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error)
            return {status:500 , error: ValidatedValue.error , data:undefined}

        const group = await Database
            .select('*')
            .from('groups')
            .where('group_id',id)
            .first()

        return {status:200 , error: undefined , data: group || {}}
    }
    async store({request}) {
        const {name} = request.body
        const rules = {
            name : 'required'
        }
        const Validation = await Validator.validateAll(request.body,rules)

        if(Validation.fails())
        return {status:422,error:Validation.fails,data:undefinedd}

        const group = await Database.table('groups').insert({name})
        return {status:200 , error:undefined , data:name}
    }
    async update({request}) {
        const {body,params} = request

        const {id} = params
        const {name} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const groupID = await Database
            .table('groups')
            .where({group_id:id})
            .update({name})

        const group = await Database
            .table('groups')
            .where({group_iod:id})
            .first()
        
        return {status:200 , error:undefined , data:group}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('groups')
            .where({group_id:id})
            .delete()
        
        return {status:200,error:undefined,data:{message:'success'}}
    }
}

module.exports = GroupController
