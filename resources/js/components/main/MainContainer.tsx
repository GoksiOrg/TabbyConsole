import {useStoreState} from "../../states/hook";
import NavBar from "./NavBar";


export default function MainContainer() {
    const name = useStoreState(store => store.user.data.username);
    return (
        <>
        <NavBar/>
        <h1 className="d-flex justify-content-center align-content-center mt-4">Hello {name}!</h1>
        </>
    );
}
