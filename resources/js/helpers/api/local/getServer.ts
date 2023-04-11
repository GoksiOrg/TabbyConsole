import { type Server } from "./getServersPaginator";
import http from "../../httpService";

/*
 * Active server is server opened in dashboard, we will do this to check instantly if user can send
 * commands, open file manager etc... without querying api
 */
export interface ActiveServer extends Server {
    permissions: number;
}
export default function getServer(id: number): Promise<ActiveServer> {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers/${id}`)
            .then(result => {
                resolve(result.data);
            })
            .catch(reject);
    });
}
