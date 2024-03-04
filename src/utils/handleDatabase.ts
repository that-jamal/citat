import { db } from './db'


export async function getData() {
    const data = await db.query('SELECT * FROM quotes')
    return data.rows
}

export async function saveData(quote: string, author: string) {
    try {
        await db.query("INSERT INTO quotes(author, quote) VALUES ($1, $2)", [author, quote])
        return 'Saved fr fr!'
    } catch (error) {
        console.log(error)
        return 'Somthing went wrong'
    }
}

export async function updateData(id: string, author: string, quote: string) {
    try {
        await db.query("UPDATE quotes SET author = $1, quote = $2 WHERE id = $3", [author, quote, id])
        return 'Updated'
    } catch (error) {
        console.log(error)
        return 'Somthing went wrong'
    }
}

export async function deleteData(id: string) {
    try {
        await db.query("DELETE FROM quotes WHERE id = $1", [id])
        return 'Deleted'
    } catch (error) {
        console.log(error)
        return 'Somthing went wrong'
    }
}