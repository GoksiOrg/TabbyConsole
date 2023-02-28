import {Server} from "../../helpers/api/local/getServersPaginator";
import {useEffect, useState} from "react";
import getResources, {InitialResources, ServerResources} from "../../helpers/api/local/getResources";
/*TODO: make scheme configurable, have to change plugin to support https also*/
export default function ServerRow(props: { server: Server, key: number }) {
    const [getStoreResources, setStoreResources] = useState<ServerResources>(InitialResources);

    const getResource = () => {
        getResources(props.server.id)
            .then(resources => setStoreResources(resources))
            .catch(() => setStoreResources(InitialResources))
    }
    useEffect(() => {
        getResource()
    }, []);
    return (
        <tr>
            <td>
                <img
                    src={getStoreResources.icon.length == 0 ? "/img/mc-default.png" : `data:image/png;base64, ${getStoreResources.icon}`}
                    alt="Server icon"/>
            </td>
            <td>
                <p>{props.server.name}</p>
                <p>{props.server.host}:{props.server.port}</p>
            </td>
            <td>{getStoreResources.usedRam} / {getStoreResources.totalRam} MB</td>
            <td>{getStoreResources.usedCpu} / 100 %</td>
            <td>{getStoreResources.onlinePlayers} / {getStoreResources.totalPlayers}</td>
            <td>S</td>
        </tr>
    );
}
