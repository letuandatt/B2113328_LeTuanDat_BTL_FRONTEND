import createApiClient from "@/services/api.service";

class TheoDoiMuonSachService {
    constructor(baseURL='/api/theodoimuonsach') {
        this.api = createApiClient(baseURL);
    }

    async getAllTDMS() {
        return (await this.api.get('/')).data;
    }

    async getAllTDMSByDocGia(dg_id) {
        return (await this.api.get(`/docgia/${dg_id}`)).data;
    }

    async getAllTDMSBySach(s_id) {
        return (await this.api.get(`/sach/${s_id}`)).data;
    }

    async muonSach(data) {
        return (await this.api.post('/muonsach', data)).data;
    }

    async traSach(id) {
        return (await this.api.put(`/trasach/${id}`)).data;
    }

    async checkSachAvailable(id) {
        return (await this.api.get(`/sachcosan/${id}`)).data;
    }
}

export default new TheoDoiMuonSachService();