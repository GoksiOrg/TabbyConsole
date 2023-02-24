import {ServerPaginator} from "../../helpers/api/local/getServersPaginator";

export default function Paginator(props: { paginator: ServerPaginator, update: (number) => void }) {
    const currentPage = props.paginator.currentPage;
    const lastPage = props.paginator.lastPage;
    const indexes = Array.from(Array(lastPage), (_, i) => i + 1);
    if (lastPage == 1) return null;
    return (
        <div className="container">
            <ul className="pagination justify-content-center">
                {indexes.map(i => (
                        <li className="page-item" key={i}>
                            <button className={`page-link ${currentPage == i ? "disabled" : ""}`}
                                    onClick={() => props.update(i)}>{i}</button>
                        </li>
                    )
                )}
            </ul>
        </div>
    );

}
