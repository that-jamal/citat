import { getData, saveData, updateData, deleteData } from "@/utils/handleDatabase";
import { revalidateTag } from "next/cache"

export default async function Home() {
  const data = await getData()
  const create = async (formData: FormData) => {
    'use server'
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const data = await saveData(quote, author)
    console.log(data)
    revalidateTag("quote")
  }

  const sortedData = data.sort((a, b) => a.id - b.id)
  const update = async (formData: FormData) => {
    'use server'
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const id = formData.get("id") as string
    const data = await updateData(id, author, quote)
    console.log(data, id, quote, author)
    revalidateTag("quote")

  }

  const deleteForm = async (formData: FormData) => {
    'use server'
    const id = formData.get("id") as string
    const data = await deleteData(id)
    console.log(data)
    revalidateTag("quote")

  }

  //console.log(data, "http://localhost:3000/")
  return (

    <div className=" bg-indigo-950  h-screen w-full flex items-center justify-center">

      <div className=" flex flex-col justify-between">
        <form className="shadow-md shadow-indigo-500 flex flex-col items-center justify-center gap-4 min-h-64 max-w-96 bg-indigo-100 p-5 rounded-md mb-8 " action={create}>
          <h1 className="text-indigo-950">Save Quote</h1>
          <input type="text" name="author" placeholder="Author" />
          <input type="text" name="quote" placeholder="Quote" />
          <button className="bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">Save Quote</button>
        </form>

        <form className="shadow-md shadow-indigo-100 flex flex-col items-center justify-center gap-4 min-h-64 max-w-96 bg-indigo-400 p-5 rounded-md" action={update}>
          <h1 className="text-indigo-100">Update Quote</h1>
          <input type="text" name="author" placeholder="Author" />
          <input type="text" name="quote" placeholder="Quote" />
          <input type="text" name="id" placeholder="ID" />
          <button className="bg-indigo-100 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">Update Quote</button>
        </form>

      </div>

      <div className="flex flex-wrap justify-center max-w-2xl">
        {sortedData.map(q => (
          <div key={q.id} className="relative min-w-36 w-1/3 max-w-64 flex-auto shadow-md shadow-indigo-500 rounded-lg p-4 bg-indigo-100 text-indigo-950 mb-8 mr-8">
            <p className="text-sm mb-5">ID: {q.id}</p>
            <h1 className="text-left text-3xl italic font-light">{q.quote}</h1>
            <h3 className="text-right">Author: {q.author}</h3>
            <div className="flex justify-between">
              <form action={deleteForm}>
                <button className="float-right mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                <input type="hidden" name="id" value={q.id} />
              </form>

            </div>
          </div>
        ))}
      </div>
    </div>




  );
}
