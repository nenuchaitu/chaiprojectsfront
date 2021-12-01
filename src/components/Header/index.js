import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'

import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const menuOptions = [
  {option: 'Home', id: 'HOME', to: '/'},
  {option: 'Add Project', id: 'ADD', to: '/add-project'},
]

class Header extends Component {
  state = {openMenu: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMobileMenu = () => {
    const {activeOption} = this.props
    return (
      <div className="mobile-menu-container">
        <ul className="mobile-options-container">
          {menuOptions.map(option => (
            <Link key={option.id} to={option.to} className="link-item">
              <button
                type="button"
                selected={activeOption === option.id}
                className={
                  activeOption === option.id
                    ? 'nav-menu-button selected'
                    : 'nav-menu-button'
                }
              >
                {option.option}
              </button>
            </Link>
          ))}
          <button
            className="logout-button"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </ul>
        <AiFillCloseCircle
          className="close-button"
          onClick={() => {
            this.setState({openMenu: false})
          }}
        />
      </div>
    )
  }

  render() {
    const {openMenu} = this.state
    const {activeOption} = this.props

    return (
      <>
        <nav className="nav-header">
          <Link to="/" className="link-item">
            <div className="header-logo-container">
              <h1 className="header-heading">Projects</h1>
            </div>
          </Link>
          <GiHamburgerMenu
            onClick={() => {
              this.setState(prevState => ({openMenu: !prevState.openMenu}))
            }}
            className="ham-menu"
          />
          <ul className="large-screen-options-container">
            {menuOptions.map(option => (
              <Link key={option.id} to={option.to} className="link-item">
                <button
                  type="button"
                  className={
                    activeOption === option.id
                      ? 'nav-menu-button selected'
                      : 'nav-menu-button'
                  }
                >
                  {option.option}
                </button>
              </Link>
            ))}
            <button
              className="logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </nav>
        {openMenu ? this.renderMobileMenu() : ''}
      </>
    )
  }
}
export default withRouter(Header)
