import React, { useEffect, useState } from 'react'


interface IProps {
    page: number,
    total: number;
    updatePage: (newPage: number) => void;
    limit: number;
}
const Paginator = (props: IProps) => {
    const { page, total, updatePage, limit } = props;
    const [pages, setPages] = useState<number[]>([])

    console.log(total)
    const onLastPage = () => {
        const lastPage = total === limit ? 0 : Math.floor(total / limit)
        updatePage(lastPage)
    }

    const createPages = () => {
        const _pages = [];
        const lastPage = total === limit ? 0 : Math.floor(total / limit)
        //populate the left side
        for (let i = page - 2; i < page; i++) {
            if (i >= 0) {
                _pages.push(i)
            }
        }
        //populate the right side
        for (let i = page; i < page + 2; i++) {
            if (i <= lastPage) {
                _pages.push(i)
            }
        }
        setPages(_pages)
    }


    useEffect(() => {
        createPages()
    }, [page, total])
    //total 24

    const lastPage = total === limit ? 0 : Math.floor(total / limit)
    return (
        <div className='mt-10  flex justify-center'>
            <div className='space-x-2 flex items-center font-mono '>
                {page !== 0 && <>
                    <button onClick={() => updatePage(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button onClick={() => updatePage(page > 0 ? page - 1 : page)} className='px-3 py-2 aspect-square'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </>
                }
                {pages.map(p => {
                    return <button onClick={() => updatePage(p)} className={`px-3 py-2 aspect-square ${page === p && "bg-black text-white"} `}>{p + 1}</button>

                })}

                {page !== lastPage && <>
                    <button onClick={() => updatePage(page < lastPage ? page + 1 : page)} className='px-3 py-2 aspect-square'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-3 h-3 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <button onClick={onLastPage} className='px-3 py-2 aspect-square'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </>
                }
            </div>
        </div>
    )
}

export default Paginator