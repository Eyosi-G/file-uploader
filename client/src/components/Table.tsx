import React, { useState } from 'react'
import { useFetchFilesQuery } from '../services/fileService'
import Paginator from './Paginator'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const Table = () => {
    const [page, setPage] = useState(0)
    const limit = 5;
    const { data: imagesData } = useFetchFilesQuery({ limit: limit, page: page })
    return (
        <div>
            <TableHeader />
            {imagesData?.images.map((image, index) => {
                const isOdd = index % 2 !== 0
                return <TableRow uploadedFile={image} isOdd={isOdd} />
            })}
            {imagesData && <div className='flex justify-end'>
                <Paginator limit={limit} page={page} total={imagesData.total} updatePage={(page) => { setPage(page) }} />
            </div>
            }
        </div>
    )
}

export default Table