const axios = require("axios");
const redis = require("../config/redisConfig.js");

const baseUrl = `${process.env.BASE_URL}/employees`;

const typeDefs = `#graphql`;

const resolvers = {};

module.exports = { typeDefs, resolvers };
