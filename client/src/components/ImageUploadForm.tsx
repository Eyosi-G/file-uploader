import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/redux-hook';
import { useUploadFileMutation } from '../services/fileService';
import UploadImage from './UploadImage'

const ImageUploadForm = () => {
    const [isEnabled, setEnabled] = useState(false)
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<File | undefined>()
    const [uploadFileHandler, { isLoading: isUploadFileLoading }] = useUploadFileMutation()
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name && image) {
            uploadFileHandler({ file: image, name: name })
            setName("")
            setImage(undefined)
        }

    }
    useEffect(() => {
        setEnabled(Boolean(name !== "" && image !== undefined))
    }, [image, name])
    return (
        <form onSubmit={onSubmitHandler}>
            <p>Uploader Name <span className='text-red-500'>*</span></p>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }} className='block w-full border rounded-md p-2 mb-2 ' placeholder='Name' type="text" />
            <p>Image <span className='text-red-500'>*</span></p>
            <UploadImage image={image} setImage={setImage} />
            <button disabled={isUploadFileLoading || !isEnabled} className='disabled:bg-gray-300 mt-2 w-full flex items-center justify-center px-5 py-2 bg-gray-500 text-white rounded-md'>
                <p className='mr-2'>Submit</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </form>
    )
}

export default ImageUploadForm