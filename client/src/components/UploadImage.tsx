import React, { useEffect, useRef, useState } from 'react'


interface IProps {
    image: File | undefined ;
    setImage: (image: File) => void;
}
const UploadImage = (props: IProps) => {
    const { image, setImage } = props;
    const [preview, setPreview] = useState<string>(() => "images/upload.png")
    const imageRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }else {
            setPreview("images/upload.png")
        }
    }, [image]);

    const onClickHandler = () => {
        if (imageRef) {
            imageRef.current?.click()
        }
    }
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const image = e.target.files[0]
        setImage(image)
        e.target.value = ""
    }
    return (
        <div className='border-2 border-dashed p-5'>
            <div className='flex flex-col items-center'>
                <img className='h-40 w-48' src={preview} />
                <button type='button' onClick={onClickHandler} className='mt-2 flex items-center justify-center px-5 py-2 bg-gray-500 text-white rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                    <p className='ml-2'>Upload</p>
                </button>
                <input className='hidden' accept='.jpg,.png,jpeg' ref={imageRef} type="file" onChange={onChangeImage} />

            </div>
        </div>
    )
}

export default UploadImage