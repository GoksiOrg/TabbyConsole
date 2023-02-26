import {Server} from "../../helpers/api/local/getServersPaginator";
/*TODO: make scheme configurable, have to change plugin to support https also*/
/*TODO: responsive*/
export default function ServerRow(props: { server: Server, key: number }) {
    return (
        <div className="row mb-4 border-light border text-center ">
            <div className="col border">
                <img src="/img/mc-default.png" alt="Minecraft block"/>
            </div>
            <div className="col border">
                <p>{props.server.host}:{props.server.port}</p>
            </div>
            <div className="col border">
                <p>0/0 MB RAM</p>
            </div>
            <div className="col border">
                <p>0/100% CPU</p>
            </div>
            <div className="col-1 border">
                <p>S</p>
            </div>
        </div>
    );
}
