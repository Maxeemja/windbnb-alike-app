import { useState } from 'react';
import AppHeader from '../appHeader/appHeader';
import PropsList from '../propsList/propsList';
import ModalFilter from '../modalFilter/modalFilter';
import Footer from '../footer/footer';

const App = () => {
    const [location, setLocation] = useState('Helsinki, Finland');
    const [guests, setGuests] = useState({adults: 0, child: 0});
    const [modalIsOpen, setIsOpen] = useState(false);
    const guestsQuantity = guests.adults + guests.child;

    return (
        <div className="app">
            <AppHeader 
                currLoc={location}
                setIsOpen={setIsOpen}
                guests={guestsQuantity}/>
            <main>
                <PropsList 
                    currLoc={location} 
                    guests={guestsQuantity}/>
                <ModalFilter
                    currLoc={location}
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    setLocation={setLocation}
                    setGuests={setGuests}
                    guests={guests}/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
