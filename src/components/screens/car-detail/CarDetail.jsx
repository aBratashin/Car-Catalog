import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from '../../../services/CarService.js'
import CarItem from '../home/car-item/CarItem.jsx'
import NotFound from '../not-found/NotFound.jsx'
import ChangeCarForm from './change-car-form/ChangeCarForm.jsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const CarDetail = () => {
	const { id } = useParams()
	const queryClient = useQueryClient()

	const { isPending, isError, data, error } = useQuery({
		queryKey: ['car', id],
		queryFn: () => CarService.getById(id)
	})

	const changeMutation = useMutation({
		mutationFn: data => CarService.changeCarById(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['car', id] })
	})

	if (isError) return <NotFound err={error.message} />

	return (
		<div className='flex flex-col justify-center items-center font-bold'>
			<Link
				className='mt-4 p-4 bg-green-700 hover:bg-green-800 rounded-2xl'
				to='/'
			>
				Назад
			</Link>
			<ChangeCarForm car={data} changeMutation={changeMutation} />
			{isPending ? (
				<div className='flex flex-wrap justify-center items-center'>
					<h1 className='text-4xl text-red-500'>Загрузка...</h1>
				</div>
			) : (
				<CarItem car={data} paramsId={id} />
			)}
		</div>
	)
}

export default CarDetail
