'use strict'

const { group } = require("@adonisjs/framework/src/Route/Manager")

const Database = use('Database')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) 
        return {status:200 , error: undefined , data:group}
    return {}
}

class GroupController {
    async index() {
        const groups = await Database.table('groups')
        return groups
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

        if(!name) 
        return {status:422 , error: `name is missing` , data:undefined}

        const group = await Database.table('groups').insert({name})
        return {status:200 , error:undefined , data:name}
    }
}

module.exports = GroupController
