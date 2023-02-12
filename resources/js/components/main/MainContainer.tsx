import {useStoreState} from "../../states/hook";


export default function MainContainer() {
    const name = useStoreState(store => store.user.data.username);
    return (<h1>Hello {name}!</h1>)
}
