import {Component} from 'react'

import Header from '../Header'
import './index.css'

class UploadData extends Component {
  state = {
    title: '',
    description: 'Write your project description here',
    projectUrl: '',
    showSubmitSuccess: false,
    errorMsg: '',
    errorStatus: false,
  }

  uploadData = async event => {
    event.preventDefault()
    const url = 'https://chaiprojectsdatabase.herokuapp.com/projects'
    const {title, description, projectUrl} = this.state
    const data = {
      title,
      description,
      projectUrl,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({showSubmitSuccess: true, errorStatus: false})
    } else {
      this.setState({errorMsg: 'Submit Failed.Try again', errorStatus: true})
    }
  }

  setDescription = e => {
    this.setState({description: e.target.value})
  }

  setTitle = e => {
    this.setState({title: e.target.value})
  }

  setUrl = e => {
    this.setState({projectUrl: e.target.value})
  }

  resetFields = () => {
    this.setState({
      title: '',
      projectUrl: '',
      description: 'Write your project description here',
      showSubmitSuccess: false,
    })
  }

  render() {
    const {
      showSubmitSuccess,
      title,
      projectUrl,
      description,
      errorMsg,
      errorStatus,
    } = this.state

    return (
      <>
        <Header activeOption="ADD" />
        <div className="file-uploader-container">
          <h1 className="upload-heading">Upload Project</h1>
          <form className="input-form-container" onSubmit={this.uploadData}>
            <div className="input-container-project">
              <label htmlFor="title" className="label-text">
                Title
              </label>
              <input
                type="text"
                className="title-input"
                id="title"
                placeholder="Enter project title here"
                value={title}
                onChange={this.setTitle}
              />
            </div>
            <div className="input-container-project">
              <label htmlFor="url" className="label-text">
                URL
              </label>
              <input
                type="url"
                className="url-input"
                id="url"
                placeholder="Enter project url here"
                value={projectUrl}
                onChange={this.setUrl}
              />
            </div>
            <div className="input-container-project">
              <label htmlFor="description" className="label-text">
                Description
              </label>
              <textarea
                className="text-area-input"
                id="description"
                rows="10"
                cols="50"
                value={description}
                onChange={this.setDescription}
              >
                {description}
              </textarea>
            </div>
            <div className="save-data-button-container">
              <button type="submit" className="save-data-button">
                Save
              </button>
            </div>
          </form>
          {showSubmitSuccess && (
            <div>
              <p className="success-text">Submitted Successfully</p>
              <button
                type="button"
                className="add-another-button"
                onClick={this.resetFields}
              >
                ADD ANOTHER
              </button>
            </div>
          )}
          {errorStatus && <p className="error-text">{errorMsg}</p>}
        </div>
      </>
    )
  }
}
export default UploadData
