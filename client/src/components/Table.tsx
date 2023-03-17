import React, { useState } from 'react'
import { useFetchFilesQuery } from '../services/fileService'
import Paginator from './Paginator'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const Table = () => {
    const [page, setPage] = useState(0)
    const limit = 2;
    const { data: imagesData } = useFetchFilesQuery({ limit: limit, page: page })
    return (
        <div className='text-xs md:text-base'>
            <div className='mt-6 overflow-auto'>
                <div className='w-[1000px] sm:w-full overflow-auto'>
                    {imagesData && imagesData.total > 0 && <TableHeader />}
                    {imagesData?.images.map((image, index) => {
                        const isOdd = index % 2 !== 0
                        return <TableRow uploadedFile={image} isOdd={isOdd} />
                    })}
                </div>
            </div>
            {imagesData && imagesData.total > 0 && <div className='flex justify-end'>
                <Paginator limit={limit} page={page} total={imagesData.total} updatePage={(page) => { setPage(page) }} />
            </div>
            }
            {!imagesData || (imagesData && imagesData.total == 0) && <div className='flex flex-col items-center'>
                <img src="images/empty.png" className='w-40' />
                <p>No image exists</p>
            </div>}
        </div>

    )
}

export default Table