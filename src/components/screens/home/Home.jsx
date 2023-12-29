import React, { useEffect, useState } from 'react'
import CarItem from './car-item/CarItem.jsx'
import CreateCarForm from './create-car-form/CreateCarForm.jsx'
import { CarService } from '../../../services/CarService.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import NotFound from '../not-found/NotFound.jsx'
import SortingCars from './sortingCars/SortingCars.jsx'

const Home = () => {
	const queryClient = useQueryClient()

	const { isPending, isError, data, error } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll()
	})

	const addMutation = useMutation({
		mutationFn: data => CarService.addCar(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] })
	})

	const deleteMutation = useMutation({
		mutationFn: id => CarService.deleteById(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] })
	})

	if (isError) return <NotFound err={error.message} />

	const [cars, setCars] = useState([])

	useEffect(() => {
		setCars(data)
	}, [data])

	const [selectedSort, setSelectedSort] = useState('')

	const sortPosts = sort => {
		setSelectedSort(sort)
		switch (sort) {
			case 'name':
				setCars([...data].sort((a, b) => a.name.localeCompare(b.name)))
				break
			case 'price':
				setCars([...data].sort((a, b) => a.price - b.price))
				break
			default:
				setCars([...data])
				break
		}
	}

	return (
		<div className='flex flex-col justify-center items-center w-full font-bold py-10 px-5'>
			<h1 className='text-6xl m-4 text-green-500 text-center'>Каталог машин</h1>
			<CreateCarForm cars={data} addMutation={addMutation} />
			<SortingCars
				defaultValue='По умолчанию'
				options={[
					{ value: 'name', name: 'По названию' },
					{ value: 'price', name: 'По Цене' }
				]}
				value={selectedSort}
				changeOption={sortPosts}
			/>
			{isError && (
				<div className='flex flex-wrap justify-center items-center'>
					<h1 className='text-4xl text-red-500'>{error.message}</h1>
				</div>
			)}
			{isPending ? (
				<div className='flex flex-wrap justify-center items-center'>
					<h1 className='text-4xl text-red-500'>Загрузка...</h1>
				</div>
			) : (
				<div className='flex flex-wrap justify-center items-center'>
					{cars?.length ? (
						cars?.map(car => (
							<CarItem car={car} key={car.id} deleteMutation={deleteMutation} />
						))
					) : (
						<h1 className='text-4xl text-red-500'>Нет машин</h1>
					)}
				</div>
			)}
		</div>
	)
}

export default Home
