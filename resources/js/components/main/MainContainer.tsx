import NavBar from "../global/NavBar";
import getServersPaginator, {Server, ServerPaginator} from "../../helpers/api/local/getServersPaginator";
import {useEffect, useState} from "react";
import Loading from "../Loading";
import ServerRow from "./ServerRow";
import Paginator from "./Paginator";

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
            <div className="container d-flex justify-content-center align-items-center flex-column">
                {isLoading ? <Loading/> : getPaginator.servers.map((server: Server) => <ServerRow
                    server={server} key={server.id}/>)}
            </div>
            {!isLoading &&
                <Paginator paginator={getPaginator} update={update}/>}
        </>
    );
}
