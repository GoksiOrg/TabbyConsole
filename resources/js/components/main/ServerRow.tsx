import {Server} from "../../helpers/api/local/getServersPaginator";
/*TODO: make scheme configurable, have to change plugin to support https also*/
export default function ServerRow(props: { server: Server, key: number }) {
    return (
        <div className="mt-4">
            <p>{props.server.host}</p>
        </div>
    );
}
