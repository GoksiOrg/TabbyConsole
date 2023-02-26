import {ServerPaginator} from "../../helpers/api/local/getServersPaginator";

export default function Paginator(props: { paginator: ServerPaginator, update: (number) => void }) {
    const currentPage = props.paginator.currentPage;
    const shouldDisable = (first: number, second: number) => {
        if (first === second) return "disabled";
        return "";
    }
    const lastPage = props.paginator.lastPage;
    const indexes = Array.from(Array(lastPage), (_, i) => i + 1);
    if (lastPage == 1) return null;
    return (
        <div className="container">
            <nav aria-label="Servers paginator">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className={`page-link ${shouldDisable(currentPage, 1)}`}
                                onClick={() => props.update(currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {indexes.map(i => (
                            <li className="page-item" key={i}>
                                <button className={`page-link ${shouldDisable(currentPage, i)}`}
                                        onClick={() => props.update(i)}>{i}</button>
                            </li>
                        )
                    )}
                    <li className="page-item">
                        <button className={`page-link ${shouldDisable(currentPage, lastPage)}`}
                                onClick={() => props.update(currentPage + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );

}
