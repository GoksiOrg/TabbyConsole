import http from "../../httpService";
import { type AxiosResponse } from "axios";

export default function deleteServer(id: number): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        http.delete(`/api/servers/${id}`).then(resolve).catch(reject);
    });
}
