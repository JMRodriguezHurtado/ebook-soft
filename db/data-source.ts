/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/user/entities/User.entity';
import { Book } from '../src/books/entities/book.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT, 10) || 3036,
    username: process.env.DB_USERNAME || 'root', 
    password: process.env.DB_PASSWORD || 'Hueden55280775',
    database: process.env.DB_DATABASE || 'ebooksoft', 
    entities: [User, Book],
    synchronize: true, 
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
