import { api } from "./api";

export interface IUploadedFile {
    id: number;
    originalName: string;
    size: number;
    createdAt: number;
    uploaderName: number;
    name: string;
}
export interface IFetchFilesQuery {
    page?: number;
    limit?: number;
}

export interface IFetchFilesResponse {
    images: IUploadedFile[];
    total: number;
}

export interface IUploadFileRequest {
    file: File;
    name: string;
}

const fileService = api.injectEndpoints({
    endpoints(build) {
        return {
            fetchFiles: build.query<IFetchFilesResponse, IFetchFilesQuery>({
                query: (data) => {
                    return {
                        url: '/images',
                        params: data
                    }
                },
                providesTags: ["files"]
            }),
            uploadFile: build.mutation<void, IUploadFileRequest>({
                query: (data) => {
                    const formData = new FormData();
                    formData.append("image", data.file);
                    formData.append("name", data.name);
                    return {
                        method: "POST",
                        url: "/images",
                        body: formData,

                    }
                },
                invalidatesTags: ["files"]
            }),
            deleteFile: build.mutation<void, number>({
                query: (id) => ({
                    url: `/images/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["files"]
            })
        }
    },
});

export const { useFetchFilesQuery, useUploadFileMutation, useDeleteFileMutation } = fileService;