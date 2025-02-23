import './index.css'

const LatestMatch = props => {
  const {eachRecent} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = eachRecent
  const classStatus = matchStatus === 'Won' ? 'status-green' : 'status-red'
  return (
    <li className="recent-container">
      <img
        src={competingTeamLogo}
        alt={`competing team {competingTeam}`}
        className="competate-logo"
      />
      <p className="competate-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`status ${classStatus}`}>{matchStatus}</p>
    </li>
  )
}
export default LatestMatch
