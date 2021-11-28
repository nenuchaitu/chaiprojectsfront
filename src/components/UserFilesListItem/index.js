import './index.css'

const UserFilesListItem = props => {
  const {data} = props
  const {title, body} = data
  return (
    <li className="user-list-item">
      <h1 className="title-heading">
        <span className="span-heading">Title:</span>
        {title}
      </h1>
      <p className="description">
        <span className="span-heading">Description:</span>
        {body}
      </p>
    </li>
  )
}
export default UserFilesListItem
