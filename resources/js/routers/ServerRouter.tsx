import { useParams, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Error, { type ErrorStatus } from "../components/Error";
import { ServerStore } from "../states/server";
import { type AxiosError } from "axios";
import Loading from "../components/Loading";
import NavBar from "../components/global/NavBar";
import SubNavBar from "../components/server/SubNavBar";

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
                !error ? (
                    <Loading />
                ) : (
                    <Error error={error} />
                )
            ) : (
                <>
                    <SubNavBar />
                    <Routes></Routes>
                </>
            )}
        </>
    );
}
