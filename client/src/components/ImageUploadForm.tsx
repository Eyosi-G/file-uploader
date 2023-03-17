import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/redux-hook';
import { useUploadFileMutation } from '../services/fileService';
import UploadImage from './UploadImage'

const ImageUploadForm = () => {
    const [errors, setErrors] = useState<string[]>([])
    const [isBlurred, setIsBlurred] = useState(false)
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<File | undefined>()
    const [uploadFileHandler, { isLoading: isUploadFileLoading }] = useUploadFileMutation()
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errors = validate()
        if (errors.length > 0) {
            return setErrors(errors)
        }
        uploadFileHandler({ file: image!, name: name })
        setName("")
        setImage(undefined)

    }
    useEffect(() => {
        const errors = validate()
        setErrors(errors)
     
    }, [image, name])

    const validate = () => {
        const maxSize = 10485760
        const errors = []
        if (!image) {
            errors.push("- Image is required")
        }
        if (image && image.size > maxSize) {
            errors.push("- Image can't be more than 10 mb")
        }
        if (!name) {
            errors.push("- Uploader name is required")
        }
        return errors;
    }


    return (
        <form onSubmit={onSubmitHandler}>
            <p>Uploader Name <span className='text-red-500'>*</span></p>
            <input onBlur={()=> setIsBlurred(true)} value={name} onChange={(e) => {
                setName(e.target.value)
            }} className='block w-full border rounded-md p-2 mb-2 ' placeholder='Name' type="text" />
            <p>Image <span className='text-red-500'>*</span></p>
            <UploadImage setBlurred={()=> setIsBlurred(true)} image={image} setImage={setImage} />
            {isBlurred && errors.map(error => {
                return <div className='my-1 text-xs text-red-500'>{error}</div>
            })}
            <button disabled={isUploadFileLoading || errors.length > 0} className='mt-5 disabled:bg-gray-300 md:mt-2 w-full flex items-center justify-center px-5 py-2 bg-gray-500 text-white rounded-md'>
                <p className='mr-2'>Submit</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </form>
    )
}

export default ImageUploadForm