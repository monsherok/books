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
		dispatch(fetchMoreBooks())
		dispatch(fetchBooks(books))
	}
	return (
		<div className='my-6'>
			{books.status === 'loading' ? (
				<h1>загрузка</h1>
			) : (
				<>
					<div className='text-center'>Found {books.booksLength} results</div>
					<div className='grid grid-cols-4 gap-9 p-5'>
						{books.books.map((book, index) => (
							<Book key={book.id + index} {...book} />
						))}
					</div>
					{books.booksLength && books.booksLength >= books.books.length ? (
						<button onClick={handleClick}>Загрузить еще</button>
					) : null}
				</>
			)}
		</div>
	)
}

export default Home
