const Role = require('../api/role/role.model')

async function createRoles(){
    try{
        const count = await Role.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new Role({name: "user"}).save(),
            new Role({name: "instructor"}).save(),
            new Role({name: "admin"}).save(),
        ]);

    } catch(error){
        console.error('Error: ',error)
    }
}

module.exports = createRoles
