import { instance } from "../api/axios.api.ts";

class UserService {
	private url = 'users'
	
	async get() {
		return instance.get(`${this.url}`);
	}
	
	async create(body) {
		return instance.post(`${this.url}`, body);
	}

	async getOne(id: number) {
		return instance.get(`${this.url}/${id}`);
	}
	
	async update(id: number, body) {
		return instance.put(`${this.url}/${id}`, body);
	}
	
	async delete(id: number) {
		return instance.delete(`${this.url}/${id}`);
	}
}

export default new UserService();