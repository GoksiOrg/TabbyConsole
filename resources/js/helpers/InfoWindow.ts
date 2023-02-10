export default interface InfoWindow extends Window {
    User?: {
        id: number,
        username: string,
        admin: boolean;
    }
}
