import axios from 'axios'

export const CarService = {
	async getAll() {
		const response = await axios.get('http://localhost:3001/cars')
		return response.data
	},
	async getById(id) {
		const response = await axios.get(`http://localhost:3001/cars?id=${id}`)
		return response.data[0]
	},
	async addCar(data) {
		return await axios.post('http://localhost:3001/cars', {
			...data
		})
	},
	async deleteById(id) {
		return await axios.delete(`http://localhost:3001/cars/${id}`)
	},
	async changeCarById(data) {
		return await axios.put(`http://localhost:3001/cars/${data.id}`, data)
	}
}
