import { type Server } from "../../helpers/api/local/getServersPaginator";
import { useEffect, useState } from "react";
import getResources, {
    InitialResources,
    type ServerResources,
} from "../../helpers/api/local/getResources";
/* TODO: make scheme configurable, have to change plugin to support https also */
export default function ServerRow(props: { server: Server; key: number }) {
    const [getStoreResources, setStoreResources] =
        useState<ServerResources>(InitialResources);
    const [isLoading, setLoading] = useState<boolean>(true);
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
                    className={
                        isLoading || !getStoreResources.online ? "pe-none" : ""
                    }
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
                <p>{props.server.name}</p>
                <p>
                    {props.server.host}:{props.server.port}
                </p>
            </td>
            <td>
                {getStoreResources.usedRam} / {getStoreResources.totalRam} MB
            </td>
            <td>{getStoreResources.usedCpu} / 100 %</td>
            <td>
                {getStoreResources.onlinePlayers} /{" "}
                {getStoreResources.totalPlayers}
            </td>
            <td>
                {isLoading ? (
                    <span
                        className="indicator loading"
                        data-toggle="tooltip"
                        title="Loading..."
                    ></span>
                ) : getStoreResources.online ? (
                    <span
                        className="indicator online"
                        data-toggle="tooltip"
                        title="Online"
                    ></span>
                ) : (
                    <span
                        className="indicator offline"
                        data-toggle="tooltip"
                        title="Offline"
                    ></span>
                )}
            </td>
        </tr>
    );
}
