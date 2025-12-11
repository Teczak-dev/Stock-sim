import { Link } from "react-router-dom";

export default function GameCard({game}) {
    return(
        <div style={{
            height: '500px',
            width: '500px',
            maxWidth: '90vw',
            maxHeight: '90vw'
        }}>
           <Link to={`/Gry/${game.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
           <h1 style={{
               flex: 1,
               width: '100%', 
               fontSize: '50px',
               margin: 0,
               padding: '10px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               textAlign: 'center'
           }}>{game.title}</h1>
           <img src={game.thumbnail} style={{
               flex: 2,
               width: '100%', 
               objectFit: 'cover',
               display: 'block'
           }} alt={game.title}></img>
           </Link>
        </div>
    );
}