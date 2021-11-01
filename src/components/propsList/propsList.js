import {stays} from  '../../stays.json';
import './propsList.scss';
const PropsList = (props) => {
    const items = stays.filter(el => `${el.city}, Finland` === props.currLoc && el.maxGuests >= props.guests).map((el, i) => {
        return (
            <div className="props__container-item" key={i}>
                <img src={el.photo} alt={el.title} />
                <div className="specs-line">
                    {el.superHost ? <span className="specs-line-superhost">SUPER HOST</span> : null}
                    <span className="specs-line-descr">{el.beds ? `${el.type} . ${el.beds} beds ` : el.type}</span>
                    <span className="specs-line-rating"><i className="fas fa-star"></i>  {el.rating}</span>
                </div>
                <div className="name-line">{el.title}</div>
            </div>
        )
    })
    return (
        <>
            <div className="subheader">
                <span className="props__list-label">Stays in Finland</span>
                <div className="counter">{items.length} stays</div>
            </div>
            <div className="props__container">
                {items}
            </div>
        </>    
    )
}
export default PropsList;