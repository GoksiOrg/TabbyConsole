import { type Server } from "../../helpers/api/local/getServersPaginator";
import { useEffect, useState } from "react";
import getResources, {
    InitialResources,
    type ServerResources,
} from "../../helpers/api/local/getResources";
import Motd from "../../helpers/Motd";
import { useStoreState } from "../../states/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import deleteServer from "../../helpers/api/local/deleteServer";
/* TODO: make scheme configurable, have to change plugin to support https also */
export default function ServerRow(props: { server: Server; key: number }) {
    const { id, admin } = useStoreState(state => state.user.data);
    const [getStoreResources, setStoreResources] = useState<ServerResources>(InitialResources);
    const [isLoading, setLoading] = useState<boolean>(true);
    const canDeleteServer = () => props.server.owner_id === id || admin;

    const handleDelete = () => {
        deleteServer(props.server.id)
            .then(res => {
                if (res.status === 204) window.location.reload();
            })
            .catch(console.log);
    };
    const getResource = () => {
        getResources(props.server.id)
            .then(resources => {
                setStoreResources(resources);
            })
            .catch(() => {
                setStoreResources(InitialResources);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getResource();
    }, []);

    useEffect(() => {
        const job = setInterval(() => {
            if (!getStoreResources.online) return;
            getResource();
        }, 30000);
        return () => {
            clearInterval(job);
        };
    }, [getStoreResources.online]);
    return (
        <tr>
            <td>
                <a
                    href={`/server/${props.server.id}`}
                    className={isLoading || !getStoreResources.online ? "pe-none" : ""}
                >
                    <img
                        src={
                            getStoreResources.icon.length === 0
                                ? "/img/mc-default.png"
                                : `data:image/png;base64, ${getStoreResources.icon}`
                        }
                        alt="Server icon"
                    />
                </a>
            </td>
            <td>
                <p className="mb-1">
                    {props.server.host}
                    {props.server.game_port === 25565 ? `` : `:${props.server.game_port}`}
                </p>
                {getStoreResources.motd.length === 0 ? (
                    <p>{props.server.name}</p>
                ) : (
                    <Motd motd={getStoreResources.motd} />
                )}
            </td>
            <td>
                {getStoreResources.usedRam} / {getStoreResources.totalRam} MB
            </td>
            <td>{getStoreResources.usedCpu} / 100 %</td>
            <td>
                {getStoreResources.onlinePlayers} / {getStoreResources.totalPlayers}
            </td>
            <td>
                {isLoading ? (
                    <span
                        className="indicator loading"
                        data-toggle="tooltip"
                        title="Loading..."
                    ></span>
                ) : getStoreResources.online ? (
                    <span className="indicator online" data-toggle="tooltip" title="Online"></span>
                ) : (
                    <span
                        className="indicator offline"
                        data-toggle="tooltip"
                        title="Offline"
                    ></span>
                )}
            </td>
            <td>
                <span
                    className={canDeleteServer() ? "delete" : "delete-disabled"}
                    data-toggle="tooltip"
                    title="Delete server"
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </span>
            </td>
        </tr>
    );
}
