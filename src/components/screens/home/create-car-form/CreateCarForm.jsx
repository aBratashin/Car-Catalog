import React, { memo, useEffect } from 'react'
import { CarService } from '../../../../services/CarService.js'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const CreateCarForm = ({ setCars, car, setCar }) => {
	const linkRegExp =
		/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const addCarToDataBase = async data => {
		try {
			const carsData = await CarService.getAll()
			return await CarService.addCar({
				id: carsData[carsData.length - 1].data + 1,
				...data
			})
		} catch (e) {
			console.log(`Ошибка при добавлении машины на сервер: ${e}`)
		}
	}

	const createCar = data => {
		console.log('create', data)
		setCars(prev => [...prev, { id: prev[prev.length - 1].id + 1, ...data }])
		addCarToDataBase(data).then(r => console.log(r))
		reset()
	}

	const { id } = useParams()

	const changeCarInDataBase = async data => {
		try {
			return await CarService.changeCarById(data)
		} catch (e) {
			console.log(`Ошибка при изменении данных на сервере: ${e}`)
		}
	}

	const changeCar = data => {
		console.log('change', data)
		const newData = {
			...car,
			name: data.name,
			price: data.price,
			image: data.image
		}
		setCar(newData)
		changeCarInDataBase(newData).then(r => console.log(r))
		reset()
	}

	car &&
		useEffect(() => {
			console.log('huy')
			setValue('name', car?.name)
			setValue('price', car?.price)
			setValue('image', car?.image)
		}, [car])

	return (
		<form
			onSubmit={handleSubmit(id ? changeCar : createCar)}
			className='w-1/2 bg-gray-800 p-4 m-8 rounded-2xl'
		>
			<div className='mb-5'>
				<label htmlFor='name' className='block mb-2 text-white'>
					Название
				</label>
				<input
					{...register('name', {
						required: {
							value: true,
							message: 'Поле обязательно для заполнения!'
						},
						minLength: {
							value: 4,
							message: 'Минимальная длина символов: 4!'
						}
					})}
					type='text'
					id='name'
					placeholder='Введите название'
					className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
				/>
				{errors?.name && (
					<div className='p-1 text-center text-red-500'>
						{errors?.name?.message}
					</div>
				)}
			</div>
			<div className='mb-5'>
				<label htmlFor='price' className='block mb-2 text-white'>
					Цена
				</label>
				<input
					{...register('price', {
						required: {
							value: true,
							message: 'Поле обязательно для заполнения!'
						},
						minLength: {
							value: 3,
							message: 'Минимальная длина символов: 3!'
						}
					})}
					type='number'
					id='price'
					placeholder='Введите цену'
					className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
				/>
				{errors?.price && (
					<div className='p-1 text-center text-red-500'>
						{errors?.price?.message}
					</div>
				)}
			</div>
			<div className='mb-5'>
				<label htmlFor='img' className='block mb-2 text-white'>
					Картинка
				</label>
				<input
					{...register('image', {
						required: {
							value: true,
							message: 'Поле обязательно для заполнения!'
						},
						minLength: {
							value: 5,
							message: 'Минимальная длина символов: 5!'
						},
						pattern: {
							value: linkRegExp,
							message: 'Введите корректную ссылку!'
						}
					})}
					type='text'
					id='img'
					placeholder='Введите ссылку'
					className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
				/>
				{errors?.image && (
					<div className='p-1 text-center text-red-500'>
						{errors?.image?.message}
					</div>
				)}
			</div>
			{id ? (
				<button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center'>
					Изменить
				</button>
			) : (
				<button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center'>
					Добавить
				</button>
			)}
		</form>
	)
}

export default memo(CreateCarForm)
