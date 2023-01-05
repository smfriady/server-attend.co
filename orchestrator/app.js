const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: employeesTypeDefs,
  resolvers: employeesResolvers,
} = require("./schema/employee");

const server = new ApolloServer({
  typeDefs: [employeesTypeDefs],
  resolvers: [employeesResolvers],
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
