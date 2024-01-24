import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import {
	useAppDispatch,
	useAppSelector,
} from '../../hooks/useAppDiapatchAndSelector'
import { fetchBooks, setSearchText } from '../../store/slices/books.slice'

function Search() {
	const [search, setSearch] = useState('')
	const dispatch = useAppDispatch()
	const { books } = useAppSelector(state => state)

	const onChange = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value)

	const handleClickSearch = () => {
		sendRequest()
	}

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && search.trim() !== '') {
			sendRequest()
		}
	}

	const sendRequest = () => {
		if (search.trim() !== '') {
			const value = search.trim()
			dispatch(setSearchText(value))
			dispatch(fetchBooks({ ...books, search: value }))
		} else {
			return
		}
	}

	return (
		<div className='relative flex w-full max-w-[24rem] bg-white '>
			<input
				type='text'
				placeholder='Search books'
				value={search}
				onChange={onChange}
				onKeyDown={handleKeyPress}
				className='pr-20 pl-2 py-2 w-full'
			/>
			<IoSearch
				role='button'
				onClick={handleClickSearch}
				fill={!search ? 'gray' : 'blue-gray'}
				className='!absolute right-2 top-1/2 -translate-y-1/2 rounded cursor-pointer p-1 w-7 h-7 hover:scale-125 transition-transform'
			/>
		</div>
	)
}

export default Search
