import { Router } from "express"
import { FileUploadController } from "./file-upload.controller"
import { FileUploadService } from "./file-upload.service"
import multer, { FileFilterCallback } from 'multer';
import { Request } from "express"
import { extname } from "path"
import { v4 } from "uuid"
const api = Router()
const fileuploadService = new FileUploadService()
const fileuploadController = new FileUploadController(fileuploadService)
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: any, file: any, cb: any) => {
        const name = `${v4()}${extname(file.originalname)}`
        cb(null, name)
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (allowedImageTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new Error(`${file.mimetype} is not allowed`))
}

const maxSize = 10485760 //10 mb
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: maxSize} });

api.post("/", upload.single("image"), fileuploadController.uploadFile)
api.get("/", fileuploadController.getFiles)
api.delete("/:id", fileuploadController.deleteFile)
export default api;

