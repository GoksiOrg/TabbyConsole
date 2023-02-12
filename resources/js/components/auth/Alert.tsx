export default function Alert(props: {shouldRender: boolean, message: string}) {
    if (!props.shouldRender) return null;
    return (
        <div className="alert alert-danger" role="alert">
            {props.message}
        </div>
    );
}
