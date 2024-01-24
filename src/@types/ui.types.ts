import { IBook } from './books.types'

export interface BooksState {
	books: IBook[]
	booksLength: number
	status: 'loading' | 'loaded' | 'error' | 'idle'
	orderBy: string
	search: string
	pagination: number
	paginationStep: number
	isInitialRequest: boolean
	paginationStatus: 'loading' | 'loaded' | 'error'
	category: string
}
