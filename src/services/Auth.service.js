import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL="/api/auth") {
        this.api = createApiClient(baseURL);
    }

    async login(data) {
        return (await this.api.post('/login', data)).data;
    }
};

export default new AuthService();