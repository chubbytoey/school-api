'use strict'

const Database = use('Database')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt.number)) {
        return {error:500}
    }
}

class GroupController {
    async index() {
        const groups = await Database.table('groups')
        return groups
    }
}

module.exports = GroupController
