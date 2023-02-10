import InfoWindow from "../../helpers/InfoWindow";


export default function MainContainer() {
    const {User} = window as InfoWindow;
    return (<h1>Hello {User.username}!</h1>)
}
