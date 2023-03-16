import http from "../../httpService";

export interface Server {
    id: number;
    name: string;
    host: string;
    port: number;
    game_port: number;
    scheme: "http" | "https";
    owner_id: number;
}

export interface ServerPaginator {
    currentPage: number;
    lastPage: number;
    servers: Server[];
}

export default function getServersPaginator(page: number = 1): Promise<ServerPaginator> {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers?page=${page}`)
            .then(result => {
                resolve({
                    currentPage: result.data.current_page,
                    lastPage: result.data.last_page,
                    servers: result.data.data,
                });
            })
            .catch(reject);
    });
}
