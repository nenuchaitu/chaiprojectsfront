import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'
import UserFilesListItem from '../UserFilesListItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {userFilesList: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const userString = Cookies.get('user')
    const userData = JSON.parse(userString)
    const jwtToken = userData.jwt_token
    const {userId} = userData
    const url = `https://userdatanode.herokuapp.com/user/${userId}`
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
        userFilesList: data.userFiles,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserFilesListView = () => {
    const {userFilesList} = this.state
    return (
      <>
        <h1 className="user-files-heading">My Files</h1>
        <ul className="user-files-list">
          {userFilesList.map(file => (
            <UserFilesListItem data={file} key={file.id} />
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
        return this.renderUserFilesListView()
      case apiStatusConstants.failure:
        return <FailureView getUserData={this.getUserData} />
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
