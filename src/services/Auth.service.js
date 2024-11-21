import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL="/api/auth") {
        this.api = createApiClient(baseURL);
    }

    async login(data) {
        return (await this.api.post('/login', data)).data;
    }

    // async logout(token) {
    //     return (await this.api.post('/logout', {}, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })).data;
    // }
};

export default new AuthService();