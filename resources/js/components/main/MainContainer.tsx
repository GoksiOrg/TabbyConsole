import NavBar from "../global/NavBar";
import getServersPaginator, {Server, ServerPaginator} from "../../helpers/api/local/getServersPaginator";
import {useEffect, useState} from "react";
import Loading from "../Loading";
import ServerRow from "./ServerRow";
/*TODO: paginator under rows*/

export default function MainContainer() {
    const [getPaginator, setPaginator] = useState<ServerPaginator>(undefined);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getServersPaginator().then(pag => setPaginator(pag))
    }, [])

    useEffect(() => {
        if (getPaginator !== undefined)
            setLoading(false);
    }, [getPaginator]);
    return (
        <>
            <NavBar/>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                {isLoading ? <Loading/> : getPaginator.servers.map((server: Server) => <ServerRow {...server}/>)}
            </div>
        </>
    );
}
