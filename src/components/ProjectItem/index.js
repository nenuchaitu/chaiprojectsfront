import './index.css'

/* const sampleDataObject = {
  title: 'abc',
  description: 'Write your project description here',
  urlInput: 'xyz',
} */

const UserFilesListItem = props => {
  const {data} = props
  const {title, description, url} = data
  return (
    <li className="user-list-item">
      <div className="title-url-container">
        <h1 className="title-heading">
          <span className="span-heading">Title:</span>
          {title}
        </h1>
        <a target="blank" href={url}>
          {url}
        </a>
      </div>
      <p className="description">
        <span className="span-heading">Description:</span>
        {description}
      </p>
    </li>
  )
}
export default UserFilesListItem
