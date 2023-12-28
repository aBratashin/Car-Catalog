import React, { memo } from 'react'
import { CarService } from '../../../../services/CarService.js'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from '../../../ui/form/Form.jsx'

const CreateCarForm = ({ addMutation }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const { id } = useParams()

	const createCar = async data => {
		try {
			const carsData = await CarService.getAll()
			addMutation.mutate({
				id: carsData[carsData.length - 1].data + 1,
				...data
			})
			reset()
		} catch (e) {
			console.log(`Ошибка при добавлении машины на сервер: ${e}`)
		}
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
