import createApiClient from "@/services/api.service";

class NhaXuatBanService {
    constructor(baseURL="/api/nhaxuatban") {
        this.api = createApiClient(baseURL);
    }

    async getAllNXB() {
        return (await this.api.get("/")).data;
    }

    async createNXB(data) {
        return (await this.api.post('/', data)).data;
    }

    async getNXBByID(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateNXB(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteNXB(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new NhaXuatBanService();