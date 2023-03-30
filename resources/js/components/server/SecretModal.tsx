export default function SecretModal(props: { secret: string }) {
    return (
        <div className="modal fade" tabIndex={-1} id="secretModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Server added !</h5>
                    </div>
                    <div className="modal-body">
                        <p>
                            Only one thing is left, enter command bellow into your minecraft console
                            to setup TabbyControl plugin !
                        </p>
                        <input
                            className="form-control bg-dark text-white overflow-scroll"
                            type="text"
                            value="/tabby setup 12 0.0.0.0 8080 https://localhost.com true tdaasdrtyhloknvz"
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary btn-block" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
