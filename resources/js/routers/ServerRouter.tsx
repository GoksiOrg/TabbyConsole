import { useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorStatus } from "../components/Error";
import { ServerStore } from "../states/server";
import { useEffect } from "react";
import { AxiosError } from "axios";
import Error from "../components/Error";
import Loading from "../components/Loading";
import NavBar from "../components/global/NavBar";

export default function ServerRouter() {
    const params = useParams<"id">();
    const [error, setError] = useState<ErrorStatus>();

    const getServer = ServerStore.useStoreActions(actions => actions.getServer);
    const clearServerState = ServerStore.useStoreActions(actions => actions.clearState);
    const name = ServerStore.useStoreState(state => state.server?.name);

    useEffect(() => {
        if (params.id === undefined) {
            return;
        }

        getServer(parseInt(params.id)).catch((err: AxiosError) => {
            console.log(err);
            setError({ statusCode: err.response.status, message: err.response.statusText });
        });

        return () => {
            clearServerState();
        };
    }, [params.id]);

    return (
        <>
            <NavBar />
            {!name ? (
                error === undefined ? (
                    <Loading />
                ) : (
                    <Error error={error} />
                )
            ) : (
                <h1>h11 {name}</h1>
            )}
        </>
    );
}
