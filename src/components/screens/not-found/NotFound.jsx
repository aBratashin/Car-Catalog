import React from 'react'

const NotFound = () => {
	return (
		<div className='grid h-screen place-items-center bg-white'>
			<div className='text-center'>
				<p className='text-base font-semibold text-indigo-600'>404</p>
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
					Страница не найдена
				</h1>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<a
						href='/'
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
					>
						Домой
					</a>
				</div>
			</div>
		</div>
	)
}

export default NotFound