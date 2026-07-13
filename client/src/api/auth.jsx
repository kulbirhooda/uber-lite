import axios from "./axios";

export async function api(path, { method = 'GET', body, auth = false }) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
        const t = localStorage.getItem('token');
        if (t) headers.Authorization = `Bearer ${t}`;
    }
    
    const { data } = await axios({
        method,
        url: `${path}`,
        headers,
        data: body ? body : undefined,
    });

    return data;
}

export const authApi = {
    async signup({ email, password, name }) {
        return api('/api/auth/signup', { method: 'POST', body: { email, password, name } });
    },
    async signin({ email, password }) {
        return api('/api/auth/signin', { method: 'POST', body: { email, password } });
    },
    async me() {
        return api('/api/auth/me', { auth: true });
    }
};

