import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachTeam} = props
  const {name, id, teamImageUrl} = eachTeam
  return (
    <Link to={`/team-matches/${id}`} className="home-link">
      <li className="team-card">
        <img src={teamImageUrl} alt={name} className="team-img" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
