import { useNavigate } from "react-router-dom";

export interface Error {
    statusCode: number;
    message: string;
}
export default function Error(props: { error: Error }) {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <div className="position-relative">
                <img src="/img/error_cat.png" alt="Error cat" />
                <p className="display-4 position-absolute bottom-0 start-83 translate-middle">
                    {props.error.statusCode}
                </p>
            </div>
            <p className="h4 mb-4">{props.error.message}</p>
            <button
                className="btn btn-primary btn-block"
                onClick={() => {
                    navigate("/");
                }}
            >
                Return home
            </button>
        </div>
    );
}
