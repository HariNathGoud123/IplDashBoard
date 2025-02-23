import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
class TeamMatches extends Component {
  state = {
    latestMatchesDetails: {},
    teamBannerUrl: '',
    teamId: '',
    recentMatchesData: [],
    isLoading: true,
  }
  componentDidMount() {
    this.getTeamMatches()
  }
  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const latestmatches = data.latest_match_details
    const recentMatches = data.recent_matches
    const formattedTeamLatestMatchDeatils = {
      umpires: latestmatches.umpires,
      result: latestmatches.result,
      manOfTheMatch: latestmatches.man_of_the_match,
      id: latestmatches.id,
      date: latestmatches.date,
      venue: latestmatches.venue,
      competingTeam: latestmatches.competing_team,
      competingTeamLogo: latestmatches.competing_team_logo,
      firstInnings: latestmatches.first_innings,
      secondInnings: latestmatches.second_innings,
      matchStatus: latestmatches.match_status,
    }
    const formattedRecentMqatches = recentMatches.map(eachReact => ({
      competingTeamLogo: eachReact.competing_team_logo,
      competingTeam: eachReact.competing_team,
      result: eachReact.result,
      matchStatus: eachReact.match_status,
      id: eachReact.id,
    }))
    this.setState({
      teamBannerUrl: data.team_banner_url,
      teamId: id + '',
      latestMatchesDetails: formattedTeamLatestMatchDeatils,
      recentMatchesData: formattedRecentMqatches,
      isLoading: false,
    })
  }
  render() {
    const {
      teamBannerUrl,
      teamId,
      latestMatchesDetails,
      recentMatchesData,
      isLoading,
    } = this.state
    const {
      umpires,
      result,
      manOfTheMatch,
      id,
      date,
      venue,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
      matchStatus,
    } = latestMatchesDetails

    return (
      <div className="main-container">
        {isLoading ? (
          <div testid="loader" className="loader">
            {' '}
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className="show">
            <img
              src={`${teamBannerUrl}`}
              alt="team banner"
              className="team-banner"
            />
            <p className="latest">Latest Matches</p>
            <div className="latest-matches-container">
              <div className="latest-matches-container-half">
                <ul>
                  <li>
                    <p>{competingTeam}</p>
                    <p>{date}</p>
                    <p>{venue}</p>
                    <p>{result}</p>
                  </li>
                </ul>
                <img
                  src={`${competingTeamLogo}`}
                  alt={`competing team ${competingTeam}`}
                  className="competate-banner"
                />
              </div>
              <ul className="latest-matches-container-half-2">
                <li>
                  <h3>First Innings</h3>
                  <p>{firstInnings}</p>
                </li>
                <li>
                  <h3>Second Innings</h3>
                  <p>{secondInnings}</p>
                </li>
                <li>
                  <h3>Man Of The Match</h3>
                  <p>{manOfTheMatch}</p>
                </li>
                <li>
                  <h3>Umpires</h3>
                  <p>{umpires}</p>
                </li>
              </ul>
            </div>
            <ul className="reacent-matches-contianer">
              {recentMatchesData.map(eachRecent => (
                <LatestMatch key={eachRecent.id} eachRecent={eachRecent} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
