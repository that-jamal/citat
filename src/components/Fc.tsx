'use client'
import react, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Fc({ data }: { data: any[] }) {
    const router = useRouter()
    const [quotes, setQuotes] = useState(data)
    function handleSort() {
        const sortedData = quotes.sort((a: any, b: any) => b.author.localeCompare(a.author))
        setQuotes(sortedData)
        router.refresh()
    }

    function handlefilter() {
        const sortedData = quotes.sort((a: any, b: any) => a.author.localeCompare(b.author))
        setQuotes(sortedData)
        router.refresh()
    }
    return (
        <div>
            <h1>Filter</h1>
            {quotes.map((d) => (
                <div key={d.id}>
                    <h1>{d.quote}</h1>
                    <h3>{d.author}</h3>
                </div>

            ))}
            <button onClick={handleSort}>
                <p>sort </p>
            </button>
            <button onClick={handlefilter}>
                <p>-filter</p>
            </button>
        </div>
    )
}