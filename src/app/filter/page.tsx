import React from 'react'
import { getData } from '@/utils/handleDatabase'
import Fc from '@/components/Fc'

export default async function Filter() {
    const data = await getData()
    const sortedData = data.sort((a, b) => a.id - b.id)
    //console.log(sortedData)
    const filterData = data.filter((e) => e.author == "a-man")
    console.log(filterData)
    return (
        <div>
            <Fc data={data}></Fc>
        </div>
    )
}