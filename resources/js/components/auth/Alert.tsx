export default function Alert(props: {shouldRender: boolean}) {
    if (!props.shouldRender) return null;
    return (
        <div className="alert alert-danger" role="alert">
            Invalid username or password !
        </div>
    );
}
