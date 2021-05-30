const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server")
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");


require("dotenv").config({path: ".env"});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) {
        console.log(err, 'Connect error')
    } else {

        console.log('Successful')
        server();
    }
});

function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
    });

    serverApollo.listen().then(({url}) => {
        console.log("########################################################")
        console.log(`Server ready in: ${url}`);
        console.log("########################################################")
    })
}
