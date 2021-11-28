import {Component} from 'react'
import Files from 'react-files'

import Header from '../Header'
import './index.css'

class UploadData extends Component {
  constructor() {
    super()
    this.state = {
      jsonFile: {},
      showSubmitSuccess: false,
    }

    this.fileReader = new FileReader()
    this.fileReader.onload = event => {
      this.setState(
        {jsonFile: JSON.parse(event.target.result)},
        this.uploadData,
      )
    }
  }

  uploadData = () => {
    const {jsonFile} = this.state
    const url = 'https://userdatanode.herokuapp.com/data'
    const dataUploadResults = jsonFile.map(async data => {
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(url, options)
      return response.ok
    })
    this.setState({showSubmitSuccess: true})
  }

  render() {
    const {showSubmitSuccess} = this.state

    return (
      <>
        <Header activeOption="UPLOAD" />
        <div className="file-uploader-container">
          <h1 className="upload-heading">Upload Json data file here</h1>
          <div className="files">
            <Files
              onChange={file => {
                this.fileReader.readAsText(file[0])
              }}
              onError={err => console.log(err)}
              accepts={['.json']}
              multiple
              maxFiles={3}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <p className="files-drop-zone">
                click on upload button or drag files here
              </p>
              <button type="button" className="upload-button">
                Upload
              </button>
            </Files>
            {showSubmitSuccess && <p>Submitted Successfully</p>}
          </div>
        </div>
      </>
    )
  }
}
export default UploadData
