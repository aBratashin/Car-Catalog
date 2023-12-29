import React from 'react'

const SortingCars = ({ options, defaultValue, value, changeOption }) => {
	return (
		<div className='mb-24'>
			<label htmlFor='cars' className='block mb-2 font-bold text-white'>
				Выберите вариант сортировки:
			</label>
			<select
				value={value}
				onChange={e => changeOption(e.target.value)}
				id='cars'
				className='bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
			>
				<option value={defaultValue}>{defaultValue}</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}

export default SortingCars
