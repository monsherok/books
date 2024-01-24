import React from 'react'
import {
	useAppDispatch,
	useAppSelector,
} from '../../hooks/useAppDiapatchAndSelector'
import { toggleFilters } from '../../store/slices/books.slice'

export interface ISelectOptions {
	id: 'category' | 'orderBy'
	label: string
	options: string[]
}

function Selection({ id, label, options }: ISelectOptions) {
	const dispath = useAppDispatch()
	const selectEl = useAppSelector(state => state.books[id])

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispath(
			toggleFilters({
				element: id,
				filter: event.target.value,
			})
		)
	}

	return (
		<div className='flex gap-4 items-center'>
			{label && <label className='text-white'>{label}</label>}
			<select
				className='bg-white pr-20 pl-2 py-2 w-full'
				value={selectEl}
				onChange={handleChange}
			>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	)
}

export default Selection
