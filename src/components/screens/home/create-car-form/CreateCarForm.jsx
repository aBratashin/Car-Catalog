import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from '../../../ui/form/Form.jsx'

const CreateCarForm = ({ cars, addMutation }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const { id } = useParams()

	const createCar = data => {
		try {
			addMutation.mutate({
				id: cars[cars.length - 1].data + 1,
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
