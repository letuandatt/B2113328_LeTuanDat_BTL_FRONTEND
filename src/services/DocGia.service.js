import createApiClient from "./api.service";

class DocGiaService {
    constructor(baseURL='/api/docgia'){
        this.api = createApiClient(baseURL);
    }

    async getAllDocGia() {
        return (await this.api.get('/')).data;
    }

    async createDocGia(data) {
        return (await this.api.post('/', data)).data;
    }

    async getDocGiaByID(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateDocGia(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteDocGia(id) {
        return (await this.api.delete(`${id}`)).data;
    }
};

export default new DocGiaService();