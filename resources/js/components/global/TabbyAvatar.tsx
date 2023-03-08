import Avatar from "boring-avatars";

const pallet = ["#485a69", "#ffffff", "#172642", "#0d6efd", "#d5e1ed"];
export default function TabbyAvatar(props: { name: string; toggler: boolean }) {
    return (
        <div
            className={props.toggler ? "navbar-toggler" : ""}
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            data-toggle="tooltip"
            title={props.name}
        >
            <Avatar
                size={35}
                name={props.name}
                variant="beam"
                colors={pallet}
            />
        </div>
    );
}
