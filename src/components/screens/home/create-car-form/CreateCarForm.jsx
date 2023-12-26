import React, { memo } from 'react'
import { CarService } from '../../../../services/CarService.js'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from '../../../ui/form/Form.jsx'

const CreateCarForm = ({ setCars }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const { id } = useParams()

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
		setCars(prev => [...prev, { id: prev[prev.length - 1].id + 1, ...data }])
		addCarToDataBase(data).then(r => console.log(r))
		reset()
	}

	return (
		<Form
			handleSubmit={handleSubmit}
			register={register}
			errors={errors}
			id={id}
			createCar={createCar}
		/>
	)
}

export default memo(CreateCarForm)
