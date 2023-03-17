import express, { } from "express"
import { DataSource } from "typeorm";
import fileupload from "./modules/file-upload/file-upload.route"
import { config } from "dotenv"
import { FileUpload } from "./models/file-upload.entitiy";
import cors from "cors"
import path from "path";
const main = () => {
    config()
    connectToDb()
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use(express.static(path.join("uploads")))
    app.use("/api/v1/images", fileupload)
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`)
    })

}

const connectToDb = async () => {
    const connection = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        synchronize: true,
        entities: [FileUpload]
    })
    await connection.initialize()
}
main()