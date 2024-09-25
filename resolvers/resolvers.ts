import { getUser } from '../controller/app.controller';
import { User, Post, Comment, Like, Notification } from '../generated-types/graphql';


/*
async function queryUserDetails(obj, args, context) {
  let { request, response } = context
  request.body = args['request']
  return await getUser(request, response)
}

const resolvers = {
  Query: {
    queryUserDetails: queryUserDetails,
  },
}
  */

const resolvers = {
  Query: {
      message: () => 'It Works!'
  },
}

export default resolvers
