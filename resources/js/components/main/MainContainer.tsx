import {useStoreState} from "../../states/hook";
import NavBar from "./NavBar";
import getServersPaginator, {ServerPaginator} from "../../helpers/api/local/getServersPaginator";
import {useEffect, useState} from "react";
import Loading from "../Loading";


export default function MainContainer() {
    const name = useStoreState(store => store.user.data.username);
    const [getPaginator, setPaginator] = useState<ServerPaginator>();
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
            {isLoading ? <Loading/> : Object.keys(getPaginator.data).map((obj, i) =>
                Object.keys(getPaginator.data[obj]).map((key, i) => <span>{getPaginator.data[obj][key]} </span>)
            )}

            <h1 className="d-flex justify-content-center align-content-center mt-4">Hello {name}!</h1>
        </>
    );
}
