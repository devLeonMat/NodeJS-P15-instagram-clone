const userController = require('../controllers/user')


const resolvers = {
    Query: {
        getUser: () => {
            console.log('Obtain user')
            return null;
        },
    },
    Mutation: {
        // User
        register: (_, {input}) => userController.register(input),
        login: (_, {input}) => userController.login(input),
    }
}
module.exports = resolvers;
