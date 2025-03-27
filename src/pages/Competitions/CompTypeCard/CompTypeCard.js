import './CompTypeCard.css';

export default function CompTypeCard(props) {
    return (
<<<<<<< HEAD
        <button className="compCard" style={{ backgroundColor: props.color}}>
=======
        <button className="compCard" style={{ backgroundColor: props.color, borderColor: props.color }}>
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
            <h1>{props.name}</h1>
        </button>
    )
}