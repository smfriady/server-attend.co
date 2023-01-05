const axios = require("axios");
const redis = require("../config/redisConfig.js");

const baseUrl = "http://localhost:4001/employees";

const typeDefs = `#graphql
  type Employee {
    id: ID
    email: String
  }

  type Query {
    employees: [Employee]
    employeeById(id: ID): Employee
    deleteEmployee(id: ID): Employee
  }

  input newEmployee {
    email: String
    password: String
  }
  
  input updateEmployee {
    id: Int
    email: String,
    password: String
  }

  type Mutation {
    addEmployee(input:newEmployee): Employee
    editEmployee(input:updateEmployee): Employee
  }
`;

const resolvers = {
  Query: {
    employees: async () => {
      try {
        const cacheEmployees = await redis.get("Employees");
        if (cacheEmployees) return JSON.parse(cacheEmployees);

        const { data } = await axios({
          url: `${baseUrl}`,
          method: "GET",
        });

        await redis.set("Employees", JSON.stringify(data));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    employeeById: async (_, { id }) => {
      try {
        const cacheEmployee = await redis.get("Employee");
        const cacheParse = JSON.parse(cacheEmployee);
        if (cacheParse.id === id) return cacheParse;

        const { data } = await axios({
          url: `${baseUrl}/${id}`,
          method: "GET",
        });

        await redis.set("Employee", JSON.stringify(data));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const { data } = await axios({
          url: `${baseUrl}/${id}`,
          method: "DELETE",
        });
        await redis.del("Employees");
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const { email, password } = args.input;
      try {
        const { data } = await axios({
          url: `${baseUrl}`,
          method: "POST",
          data: { email, password },
        });

        await redis.del("Employees");
      } catch (err) {
        console.log(err);
      }
    },
    editEmployee: async (_, args) => {
      const { id, email, password } = args.input;
      try {
        await axios({
          url: `${baseUrl}/${id}`,
          method: "PUT",
          data: { email, password },
        });

        await redis.del("Employees");
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
