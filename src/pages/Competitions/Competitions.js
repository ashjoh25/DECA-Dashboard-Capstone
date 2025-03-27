<<<<<<< HEAD
import './Competitions.css';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import CompTypeCard from './CompTypeCard/CompTypeCard'

export default function Competitions() {
=======
import { useNavigate } from 'react-router-dom';
import './Competitions.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import CompTypeCard from './CompTypeCard/CompTypeCard';

export default function Competitions() {
    const navigate = useNavigate();

    const handleNavigation = (comp_id) => {
        navigate('/events', { state: { comp_id } });
    };

>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
    return (
        <div>
            <Header />
            <Menu />
            <h1 className="comp">View Competitions</h1>

            <div className="competition-grid">
<<<<<<< HEAD

            <a href={`events?comp_id=1`}><CompTypeCard name="Regionals" color="#F5585E" /></a>
            <a href={`events?comp_id=2`}><CompTypeCard name="States" color="#FFC511" /></a>
            <a href={`events?comp_id=3`}><CompTypeCard name="Nationals" color="#00529B" /></a>

                
            </div>
        </div>
    )
}
=======
                <div onClick={() => handleNavigation(1)} style={{ cursor: 'pointer' }}>
                    <CompTypeCard name="Regionals" color="#F5585E" />
                </div>
                <div onClick={() => handleNavigation(2)} style={{ cursor: 'pointer' }}>
                    <CompTypeCard name="States" color="#FFC511" />
                </div>
                <div onClick={() => handleNavigation(3)} style={{ cursor: 'pointer' }}>
                    <CompTypeCard name="Nationals" color="#00529B" />
                </div>
            </div>
        </div>
    );
}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
