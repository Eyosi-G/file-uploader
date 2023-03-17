import React from 'react'
import ImageUploadForm from './components/ImageUploadForm'
import Paginator from './components/Paginator'
import Table from './components/Table'

const App = () => {
  return (
    <div className=''>
      <div className='py-10 bg-gray-100 '>
        <h1 className='text-3xl font-bold uppercase tracking-widest text-center '>File Uploader</h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-2 p-10'>
        <div className='col-span-full md:col-span-4'>
          <ImageUploadForm />
        </div>
        <div className='col-span-full md:col-span-8 '>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default App