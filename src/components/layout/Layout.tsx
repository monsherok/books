import { ReactNode } from 'react'
import Search from '../search/Search'
import Selection, { ISelectOptions } from '../select/Select'

interface LayoutProps {
	children: ReactNode
}

const category: ISelectOptions = {
	id: 'category',
	label: 'categories',
	options: [
		'all',
		'art',
		'biography',
		'computers',
		'history',
		'medical',
		'poetry',
	],
}

const orderBy: ISelectOptions = {
	id: 'orderBy',
	label: 'Sorting by',
	options: ['relevance', 'newest'],
}

function Layout({ children }: LayoutProps) {
	return (
		<div className='container mx-auto flex flex-col '>
			<div className='bg-[url("/img/bg.jpg")] bg-center py-7 flex flex-col items-center justify-center gap-5'>
				<h1 className='text-4xl text-white'>Search for books</h1>
				<Search />
				<div className='flex gap-14'>
					<Selection {...category} />
					<Selection {...orderBy} />
				</div>
			</div>
			{children}
		</div>
	)
}

export default Layout
