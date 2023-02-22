import http from "../../httpService";

export interface Server {
    name: string;
    host: string;
    port: number;
    owner_id: number;
}

export interface ServerPaginator {
    current_page: number;
    last_page: number;
    data: Server[];
}

export default function getServersPaginator(page: number = 1): Promise<ServerPaginator> {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers?page=${page}`)
            .then(result => resolve(result.data))
            .catch(reject);
    });
}
