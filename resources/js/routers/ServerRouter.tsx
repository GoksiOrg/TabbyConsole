import { useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorStatus } from "../components/Error";

export default function ServerRouter() {
    const params = useParams<"id">();
    const [error, setError] = useState<ErrorStatus>();
    return <h1>smth</h1>;
}
