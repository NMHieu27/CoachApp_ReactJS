import './CardStat.scss';
function CardStat({ title = '.', value = '.', icon = <i class="fa-solid fa-dollar-sign"></i>, colorCard = 'blue' }) {
    return (
        <div className="card-stat" style={{ borderLeft: `5px solid ${colorCard}` }}>
            <div className="card-stat__container">
                <div className="card-stat-content">
                    <div className="card-stat-content__title" style={{ color: colorCard }}>
                        {title}
                    </div>
                    <div className="card-stat-content__value">{value}</div>
                </div>
                <div className="card-stat-icon">{icon}</div>
            </div>
        </div>
    );
}

export default CardStat;
