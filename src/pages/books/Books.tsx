import { useLocation } from 'react-router-dom'
import { IBook } from '../../@types/books.types'
import { useAppSelector } from '../../hooks/useAppDiapatchAndSelector'

function Books() {
	const { books } = useAppSelector(state => state.books)
	const location = useLocation()
	const bookId = location.pathname.replace('/book/', '')
	const data: IBook = books.filter(book => book.id === bookId)[0]
	return (
		<>
			<div className='flex gap-5'>
				<div className='flex items-center justify-center p-10 bg-brown-50 min-w-96'>
					<img
						className='min-w-52'
						src={data.volumeInfo.imageLinks?.thumbnail}
						alt={data.volumeInfo.title}
					/>
				</div>
				<div className='flex flex-col gap-5 p-10'>
					<span className=' text-gray-600 text-sm'>
						{data.volumeInfo.categories}
					</span>
					<h1 className='font-bold text-4xl'>{data.volumeInfo.title}</h1>
					<p className='underline text-gray-600 text-sm'>
						{data.volumeInfo.authors}
					</p>
					<span className='border border-blue-gray-100 p-2 min-h-52'>
						<p>{data.volumeInfo.description}</p>
					</span>
				</div>
			</div>
		</>
	)
}

export default Books
