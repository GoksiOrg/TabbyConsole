import {Server} from "../../helpers/api/local/getServersPaginator";
/*TODO: make scheme configurable, have to change plugin to support https also*/
export default function ServerRow(server: Server) {
    return (
        <div className="mt-4">
            <p>{server.host}</p>
        </div>
    );
}
