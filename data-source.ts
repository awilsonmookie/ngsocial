import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource ({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "devUseer",
    "password": "devUser357",
    "database": "angdev",
    "synchronize": true,
    "logging": false,
    "entities": ["/entity/*.ts"],
    "migrations": ["/migrations/*.ts"],
    "subscribers": ["/subscribers/*.ts"]
  })