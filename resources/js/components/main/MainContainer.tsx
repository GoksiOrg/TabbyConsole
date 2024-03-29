import NavBar from "../global/NavBar";
import getServersPaginator, {
    type Server,
    type ServerPaginator,
} from "../../helpers/api/local/getServersPaginator";
import { useEffect, useState } from "react";
import ServerRow from "./ServerRow";
import Paginator from "./Paginator";
import Loading from "../Loading";
import { useSearchParams } from "react-router-dom";

export default function MainContainer() {
    const [getPaginator, setPaginator] = useState<ServerPaginator>();
    const [searchParam, setSearchParam] = useSearchParams();
    const [isLoading, setLoading] = useState<boolean>(true);
    const initialPage = parseInt(searchParam.get("page") ?? "1");
    const update = (page: number) => {
        setLoading(true);
        getServersPaginator(page)
            .then(paginator => {
                setPaginator(paginator);
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        update(initialPage);
    }, []);

    useEffect(() => {
        if (getPaginator !== undefined) {
            setSearchParam(
                getPaginator.currentPage === 1
                    ? []
                    : [["page", getPaginator.currentPage.toString()]]
            );
            setLoading(false);
        }
    }, [getPaginator]);
    return (
        <>
            <NavBar />
            <div className="container-md table-responsive-md">
                <table className="table text-white mb-3 align-middle mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Icon</th>
                            <th scope="col">Name</th>
                            <th scope="col">RAM Usage</th>
                            <th scope="col">CPU Usage</th>
                            <th scope="col">Players</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6}>
                                    <Loading />
                                </td>
                            </tr>
                        ) : getPaginator.servers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    You currently don't have any servers !
                                </td>
                            </tr>
                        ) : (
                            getPaginator.servers.map((server: Server) => (
                                <ServerRow server={server} key={server.id} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {!isLoading && <Paginator paginator={getPaginator} update={update} />}
        </>
    );
}
