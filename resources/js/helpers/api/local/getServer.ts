import { Server } from "./getServersPaginator";
import http from "../../httpService";

export default function getServer(id: number): Promise<Server> {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers/${id}`)
            .then(result => {
                resolve(result.data);
            })
            .catch(reject);
    });
}
