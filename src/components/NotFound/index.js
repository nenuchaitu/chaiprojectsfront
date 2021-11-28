import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-view">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <div className="home-button-container">
        <Link to="/">
          <button className="home-button" type="button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default NotFound
