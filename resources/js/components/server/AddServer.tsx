import NavBar from "../global/NavBar";
import React from "react";
import { useRef } from "react";
import { FormEvent } from "react";
import validateInput from "../../helpers/validationHelper";

export default function AddServer() {
    const nameRef = useRef<HTMLInputElement>();
    const hostRef = useRef<HTMLInputElement>();
    const portRef = useRef<HTMLInputElement>();
    const gamePortRef = useRef<HTMLInputElement>();
    const isSecure = () => {
        return window.location.protocol === "https:";
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("is-invalid");
    };

    const proceedServerStoreReq = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate(nameRef.current, hostRef.current, portRef.current, gamePortRef.current))
            return;
    };
    return (
        <div>
            <NavBar />
            <form onSubmit={proceedServerStoreReq}>
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
                            value="25565"
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

    return nameChecked || hostChecked || portChecked || gamePortChecked;
}
