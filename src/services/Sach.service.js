import createApiClient from "@/services/api.service";

class SachService {
    constructor(baseURL='/api/sach') {
        this.api = createApiClient(baseURL);
    }

    async getAllSach() {
        return (await this.api.get('/')).data;
    }

    async createSach(data) {
        return (await this.api.post('/', data)).data;
    }

    async getSachById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateSach(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteSach(id) {
        return (await this.api.delete(`${id}`)).data;
    }
}

export default new SachService();