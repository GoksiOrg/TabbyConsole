import type React from "react";

export default function TabbyModal(props: { title: string; children: React.ReactNode }) {
    return (
        <div className="modal fade" tabIndex={-1} id="addServerModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                    </div>
                    <div className="modal-body">{props.children}</div>
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
