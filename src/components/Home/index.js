import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'
import ProjectItem from '../ProjectItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {projectsList: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://chaiprojectsdatabase.herokuapp.com/projects`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        projectsList: data.projects,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProjectsListView = () => {
    const {projectsList} = this.state
    return (
      <>
        <h1 className="user-files-heading">My Projects</h1>
        <ul className="user-files-list">
          {projectsList.map(file => (
            <ProjectItem data={file} key={file.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-view-container">
      <Loader type="TailSpin" color="#FFCC00" height="50" width="50" />
    </div>
  )

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsListView()
      case apiStatusConstants.failure:
        return <FailureView getProjectsData={this.getProjectsData} />
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header activeOption="HOME" />
        <div className="home-body-container">
          <div className="user-data-loader">{this.renderApiView()}</div>
        </div>
      </>
    )
  }
}
export default Home
