import http from "../../httpService";

export interface ServerResources {
    icon: string;
    motd: string;
    totalPlayers: number;
    onlinePlayers: number;
    totalRam: number;
    usedRam: string;
    usedCpu: string;
    online: boolean;
}

export const InitialResources: ServerResources = {
    icon: "",
    motd: "",
    totalPlayers: 0,
    onlinePlayers: 0,
    totalRam: 0,
    usedRam: "0",
    usedCpu: "0",
    online: false,
};

export default function getResources(id: number): Promise<ServerResources> {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers/${id}/resources`)
            .then(result => {
                resolve({
                    icon: result.data.server_icon,
                    motd: result.data.motd,
                    totalPlayers: result.data.max_players,
                    onlinePlayers: result.data.online_players,
                    totalRam: result.data.total_ram,
                    usedRam: result.data.used_ram.toFixed(2),
                    usedCpu: (result.data.cpu_usage * 100).toFixed(2),
                    online: true,
                });
            })
            .catch(reject);
    });
}
