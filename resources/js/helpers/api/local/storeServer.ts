import http from "../../httpService";

interface StoreServerRequest {
    name: string;
    host: string;
    port: number;
    game_port: number;
    scheme: "http" | "https";
}

interface SecretResponse {
    secret: string;
}

export default function storeServer(server: StoreServerRequest): Promise<SecretResponse> {
    return new Promise((resolve, reject) => {
        http.post("/servers", server)
            .then(result => resolve(result.data))
            .catch(reject);
    });
}
