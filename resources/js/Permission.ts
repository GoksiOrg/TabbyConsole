export enum Permission {
    WEBSOCKET_CONNECT = 1 << 0,
    WEBSOCKET_SEND_COMMAND = 1 << 1,
    VIEW_FILES = 1 << 2,
    EDIT_FILES = 1 << 3,
}
