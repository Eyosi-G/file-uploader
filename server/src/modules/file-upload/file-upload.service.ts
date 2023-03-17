import { FileUpload } from "../../models/file-upload.entitiy";
import { GetFilesQuery } from "./dto/get-files.query";
import { UploadFileDto } from "./dto/upload-file.dto";
import fs from "fs"
import { PROJECT_DIR } from "../../setting";
export class FileUploadService {
    async uploadFile(data: UploadFileDto, file: Express.Multer.File) {
        const fileUploader = new FileUpload();
        fileUploader.originalName = file.originalname;
        fileUploader.name = file.filename;
        fileUploader.uploaderName = data.name
        fileUploader.size = file.size;
        await fileUploader.save()
    }

    async deleteFile(id: number) {
        const fileUploaded = await FileUpload.findOne({ where: { id } })
        if (!fileUploaded) throw new Error("file not found");
        await fileUploaded?.remove()
        removeFile(fileUploaded.name)

    }
    async getFiles(query: GetFilesQuery) {
        const total = await FileUpload.count()
        const data = await FileUpload.find({
            take: query.limit,
            skip: query.page * query.limit
        })
        return {
            total,
            images: data
        }
    }
}

export const removeFile = (filename: string) => {
    const path = `${PROJECT_DIR}/../uploads/${filename}`
    if (fs.existsSync(path)) {
        fs.unlink(path, (_) => { })
    }
}