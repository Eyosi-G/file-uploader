import React from 'react'

const TableHeader = () => {
    return (
        <div className='grid grid-cols-6 w-full gap-2 border rounded-md p-2 font-bold'>
            <div >File</div>
            <div >Name</div>
            <div >Size</div>
            <div >Date Uploaded</div>
            <div >Uploaded By</div>
            <div ></div>
        </div>
    )
}

export default TableHeader