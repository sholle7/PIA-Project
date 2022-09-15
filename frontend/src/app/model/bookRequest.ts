export class BookRequest {
    id : number
    name : string
    publisher : string
    year : number
    language: string
    coverPicture: string
    status: string
    authors: Array<string>
    genres: Array<string>
    amount: number
    username: string
}