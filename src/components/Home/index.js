import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
class Home extends Component {
  state = {teamsData: [], isLoading: true}
  componentDidMount() {
    this.getTeamData()
  }
  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const teamsDatatoCamelCase = teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsData: teamsDatatoCamelCase, isLoading: false})
    console.log(data)
  }
  render() {
    const {teamsData, isLoading} = this.state
    return (
      <Link to="/" className="home-link">
        <div className="home-container">
          {isLoading ? (
            <div testid="loader" className="loader">
              {' '}
              <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
            </div>
          ) : (
            <div className="show-home">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                  alt="ipl logo"
                  className="ipl-logo"
                />
                <h1 className="heading">IPL Dashboard</h1>
              </div>
              <ul className="teams-container">
                {teamsData.map(eachTeam => (
                  <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    )
  }
}
export default Home
