import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express"
import { GetFilesQuery } from "./dto/get-files.query";
import { UploadFileDto } from "./dto/upload-file.dto";
import { FileUploadService } from "./file-upload.service";



export class FileUploadController {
    private readonly fileuploadService: FileUploadService
    constructor(fileuploadService: FileUploadService) {
        this.fileuploadService = fileuploadService;
    }
    uploadFile = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) return next(new Error("File is needed"))
        const data = plainToInstance(UploadFileDto, req.body)
        const errors = await validate(data);
        if (errors.length > 0) res.status(400).json({ errors })
        await this.fileuploadService.uploadFile(data, req.file)
        res.status(200).end()
    }
    deleteFile = async (req: Request, res: Response) => {
        const id = Number(req.params["id"])
        await this.fileuploadService.deleteFile(id)
        res.status(200).end()
    }
    getFiles = async (req: Request, res: Response) => {
        const queries = plainToInstance(GetFilesQuery, req.query)
        const errors = await validate(queries);
        if (errors.length > 0) return res.status(400).json({ errors })
        if (!queries.limit) queries.limit = 10;
        if (!queries.page) queries.page = 0
        const data = await this.fileuploadService.getFiles(queries)
        return res.json(data)
    }
}