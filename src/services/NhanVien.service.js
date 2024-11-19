import createApiClient from "@/services/api.service";

class NhanVienService {
    constructor(baseURL='/api/nhanvien') {
        this.api = createApiClient(baseURL);
    }

    async getAllNhanVien() {
        return (await this.api.get('/')).data;
    }

    async createNV(data) {
        return (await this.api.post('/', data)).data;
    }

    async getNhanVienById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateNhanVien(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteNhanVien(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new NhanVienService();