import NavBar from "../global/NavBar";
import getServersPaginator, {Server, ServerPaginator} from "../../helpers/api/local/getServersPaginator";
import {useEffect, useState} from "react";
import ServerRow from "./ServerRow";
import Paginator from "./Paginator";
import Loading from "../Loading";

export default function MainContainer() {
    const [getPaginator, setPaginator] = useState<ServerPaginator>(undefined);
    const [isLoading, setLoading] = useState<boolean>(true);
    const update = (page: number) => {
        setLoading(true);
        getServersPaginator(page).then(paginator => setPaginator(paginator));
    }

    useEffect(() => {
        update(1);
    }, [])

    useEffect(() => {
        if (getPaginator !== undefined)
            setLoading(false);
    }, [getPaginator]);
    return (
        <>
            <NavBar/>
            <div className="container-md table-responsive-md">
                <table className="table text-white mb-3 align-middle">
                    <thead>
                    <tr>
                        <th scope="col">
                            Icon
                        </th>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            RAM Usage
                        </th>
                        <th scope="col">
                            CPU Usage
                        </th>
                        <th scope="col">
                            Players
                        </th>
                        <th scope="col">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? <tr>
                        <td colSpan={5}><Loading/></td>
                    </tr> : getPaginator.servers.map((server: Server) => <ServerRow
                        server={server} key={server.id}/>)}
                    </tbody>
                </table>
            </div>
            {!isLoading &&
                <Paginator paginator={getPaginator} update={update}/>}
        </>
    );
}
