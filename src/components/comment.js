export default ({comment}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{comment.name} {comment.email} </h5>
                <p className="card-text">{comment.body}</p>
            </div>
        </div>
    )
}
