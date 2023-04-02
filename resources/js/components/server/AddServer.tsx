import NavBar from "../global/NavBar";
import { useRef, useState, useEffect } from "react";
import type React from "react";
import type { FormEvent } from "react";

import { type ErrorStatus } from "../Error";
import validateInput from "../../helpers/validationHelper";
import storeServer, { type SecretResponse } from "../../helpers/api/local/storeServer";
import TabbyModal from "./TabbyModal";

import { type AxiosError } from "axios";
import { Modal } from "bootstrap";

export default function AddServer() {
    const [response, setResponse] = useState<SecretResponse>({ id: -1, secret: "" });
    const [error, setError] = useState<ErrorStatus>();
    const isMounted = useRef(false);
    const nameRef = useRef<HTMLInputElement>();
    const hostRef = useRef<HTMLInputElement>();
    const portRef = useRef<HTMLInputElement>();
    const gamePortRef = useRef<HTMLInputElement>();
    const sslRef = useRef<HTMLInputElement>();
    const isSecure = () => {
        return window.location.protocol === "https:";
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("is-invalid");
    };

    useEffect(() => {
        if (isMounted.current) {
            const modal = Modal.getOrCreateInstance("#addServerModal");
            modal.show();
            (document.getElementById("requestForm") as HTMLFormElement).reset();
        } else isMounted.current = true;
    }, [response, error]);
    const proceedServerStoreReq = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = nameRef.current;
        const host = hostRef.current;
        const port = portRef.current;
        const gamePort = gamePortRef.current;
        if (!validate(name, host, port, gamePort)) return;
        storeServer({
            name: name.value,
            host: host.value,
            port: Number(port.value),
            game_port: Number(gamePort.value),
            scheme: sslRef.current.checked ? "https" : "http",
        })
            .then(response => {
                setResponse(response);
            })
            .catch((err: AxiosError) => {
                console.log(err);
                // @ts-expect-error
                setError({ message: err.response.data.message, statusCode: err.response.status });
            });
    };

    return (
        <div>
            <NavBar />
            {error === undefined ? (
                response.id !== -1 && (
                    <TabbyModal title="Server added !">
                        <p>
                            Only one thing is left, enter command bellow into your minecraft console
                            to setup TabbyControl plugin !
                        </p>
                        <input
                            className="form-control bg-dark text-white overflow-scroll"
                            type="text"
                            value={`/tabby setup ${response.id} 0.0.0.0 ${portRef.current.value} ${window.location.origin} ${sslRef.current.checked} ${response.secret}`}
                            disabled
                            readOnly
                        />
                    </TabbyModal>
                )
            ) : (
                <TabbyModal title={"Error !"}>
                    <p>Unexpected error while creating server !</p>
                    <p>Status code: {error.statusCode}</p>
                    <p>Message: {error.message}</p>
                </TabbyModal>
            )}
            <form onSubmit={proceedServerStoreReq} id="requestForm">
                <div className="container grid">
                    <div className="form-floating mt-5 mb-4 g-col-6">
                        <input
                            className="form-control bg-dark text-light"
                            maxLength={32}
                            minLength={3}
                            onChange={handleOnChange}
                            ref={nameRef}
                        />
                        <label className="form-label text-light">Server name</label>
                        <div className="invalid-feedback">
                            Server name must have between 3 and 32 chars
                        </div>
                    </div>
                    <div className="form-floating mb-4 mt-5 g-col-6">
                        <input
                            className="form-control bg-dark text-light"
                            ref={hostRef}
                            onChange={handleOnChange}
                        />
                        <label className="form-label text-light">Hostname</label>
                        <div className="invalid-feedback">
                            Hostname must be valid hostname or ip address !
                        </div>
                    </div>
                    <div className="form-floating mb-4 g-col-6">
                        <input
                            className="form-control bg-dark text-light"
                            ref={portRef}
                            onChange={handleOnChange}
                        />
                        <label className="form-label text-light">Port</label>
                        <div className="invalid-feedback">
                            Port must be valid number between 0 and 65535 !
                        </div>
                    </div>
                    <div className="form-floating mb-4 g-col-6">
                        <input
                            className="form-control bg-dark text-light"
                            defaultValue="25565"
                            ref={gamePortRef}
                            onChange={handleOnChange}
                        />
                        <label className="form-label text-light">Game port</label>
                        <div className="invalid-feedback">
                            Game port must be valid number between 0 and 65535 !
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            ref={sslRef}
                            checked={isSecure()}
                            disabled={isSecure()}
                        />
                        <label className="form-check-label" htmlFor="sslSwitch">
                            SSL
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4">
                        Add server
                    </button>
                </div>
            </form>
        </div>
    );
}

function validate(
    nameField: HTMLInputElement,
    hostField: HTMLInputElement,
    portField: HTMLInputElement,
    gamePortField: HTMLInputElement
): boolean {
    const nameChecked = validateInput(nameField, str => {
        return str.length > 3 && str.length < 32;
    });
    const hostChecked = validateInput(hostField, str => {
        const hostRegex = /^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i;
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return hostRegex.test(str) || ipRegex.test(str);
    });
    const checkPort = (str: string) => {
        const numb = Number(str);
        if (isNaN(numb)) return false;
        return numb >= 0 || numb <= 65535;
    };
    const portChecked = validateInput(portField, checkPort);
    const gamePortChecked = validateInput(gamePortField, checkPort);

    return nameChecked && hostChecked && portChecked && gamePortChecked;
}
