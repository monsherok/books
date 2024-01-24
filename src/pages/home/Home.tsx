import { Spinner } from '@material-tailwind/react'
import Book from '../../components/book/Book'
import {
	useAppDispatch,
	useAppSelector,
} from '../../hooks/useAppDiapatchAndSelector'
import { fetchBooks, fetchMoreBooks } from '../../store/slices/books.slice'

function Home() {
	const books = useAppSelector(state => state.books)
	const dispatch = useAppDispatch()

	function handleClick() {
		const paginationCount = books.books.length + books.paginationStep
		dispatch(fetchMoreBooks(paginationCount))
		dispatch(fetchBooks({ ...books, pagination: paginationCount }))
	}

	if (
		books.booksLength === 0 &&
		!books.isInitialRequest &&
		books.status !== 'loading'
	)
		return (
			<div className='my-6 mx-auto'>По вашему запросу ничего не найдено</div>
		)

	if (
		books.booksLength === 0 &&
		books.isInitialRequest &&
		books.status !== 'loading'
	)
		return (
			<div className='my-6 mx-auto'>
				Чтобы найти книгу, введите название в поле поиска
			</div>
		)

	return (
		<div className='my-6'>
			{books.status === 'loading' ? (
				<div className='my-6 flex items-center justify-center'>
					<Spinner />
				</div>
			) : (
				<>
					<div className='text-center'>Found {books.booksLength} results</div>
					<div className='grid grid-cols-4 gap-9 p-5'>
						{books.books.map((book, index) => (
							<Book key={book.id + index} {...book} />
						))}
					</div>
					{books.booksLength && books.booksLength - 1 >= books.books.length ? (
						<button
							className='flex items-center justify-center py-1 px-3 bg-brown-200 mx-auto'
							onClick={handleClick}
						>
							{books.paginationStatus === 'loading' ? <Spinner /> : 'Load more'}
						</button>
					) : null}
				</>
			)}
		</div>
	)
}

export default Home
