import http from "../../httpService";

export interface LoginResponse {
    success: boolean;
    redirect: string;
    error: string;
}

export interface LoginData {
    username: string;
    password: string;
    rememberMe: boolean;
}

export default function login(data: LoginData): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        http.get("/sanctum/csrf-cookie")
            .then(() => {
                http.post("/login", data).then(result => {
                    resolve(result.data);
                });
            })
            .catch(reject);
    });
}
