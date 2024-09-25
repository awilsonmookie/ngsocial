import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import * as Redis from './utils/redis'
import AppRouter from './routes/app.route'
import * as cors from 'cors'

// Graphql Imports
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import resolvers from './resolvers/resolvers'
//import typeDefs from './typedefs/typeDefs'
import * as http from 'http'

import gpl from "graphql-tag";
import * as fs from 'fs'; 
const typeDefs = gpl`${fs.readFileSync(__dirname.concat('/typedefs/schema.graphql'), 'utf8')}`;

// Entity imports
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';
import { Like } from './entity/Like';
import { Notification } from './entity/Notification';

// Type ORM Imports
import { DataSource, Repository, DataSourceOptions} from "typeorm";

// constants for database
const {
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
} = process.env;

// connection string information and the seeder options
const options: DataSourceOptions = {
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "devUseer",
  password: DB_PASSWORD || "devUser357",
  database: DB_NAME || "angdev",
  entities: [User, Post, Comment, Like, Notification],
};

const dataSource = new DataSource(options);


export type Context = {
  orm: {
    userRepository: Repository<User>;
    postRepository: Repository<Post>;
    commentRepository: Repository<Comment>;
    likeRepository: Repository<Like>;
    notificationRepository: Repository<Notification>;
  };
};

const app = express()

async function startServer() {
  const httpServer = http.createServer(app)

  const userRepository: Repository<User> = dataSource.getRepository(User);
  const postRepository: Repository<Post> = dataSource.getRepository(Post);
  const commentRepository: Repository<Comment> = dataSource.getRepository(Comment);
  const likeRepository: Repository<Like> = dataSource.getRepository(Like);
  const notificationRepository: Repository<Notification> = dataSource.getRepository(Notification);

  const context: Context = {
    orm: {
      userRepository: userRepository,
      postRepository: postRepository,
      commentRepository: commentRepository,
      likeRepository: likeRepository,
      notificationRepository: notificationRepository
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()

  app.use(express.json())
 // app.use(Redis.attachRedisClient)
  // Graphql Entry point
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        // Add optional configuration options
        request: req,
        response: res,
      }),
    })
  )

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use('/api/', AppRouter)

  httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`server started on 3000!`)
  })
}

startServer()
