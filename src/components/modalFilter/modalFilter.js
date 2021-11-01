import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import './modalFilter.scss';


ReactModal.setAppElement('#root');
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(79, 79, 79, 0.4)'
    },
    content: {
        top: '0',
        left: '0',
        right: 'auto',
        width: '100%',
        padding: '93px 0 57px 0',
        bottom: 'auto',
    },
};

const ModalFilter = ({setIsOpen, modalIsOpen, setLocation, setGuests, currLoc, guests}) => {
    const [tempLocation, setTempLocation] = useState(currLoc);
    const [tempGuests, setTempGuests] = useState({adults: 0, child: 0});
    const [activeTab, setActiveTab] = useState('location');

    useEffect(() => {
        setTempLocation(currLoc);
        setActiveTab('location');
        setTempGuests(guests)
    }, [modalIsOpen])

    function closeModal() {
        setIsOpen(false);
    }
    const clickOnLoc = (e) => {
        setTempLocation(e.target.textContent);
        /* setLocation(e.target.textContent); */
    }
    const setActiveClass = (tab) => {
        const tabId = tab.closest('div')["id"]; 
        setActiveTab(tabId);
    }

    const calcGuests = (age, action) => {
        if (age === 'adult' && action === "inc" && tempGuests.adults < 10) {
            setTempGuests({...tempGuests, adults: tempGuests.adults + 1});
        } else if (age === 'adult' && action === "dec" && tempGuests.adults > 0) {
            setTempGuests({...tempGuests, adults: tempGuests.adults - 1})
        } else if (age === 'child' && action === "inc" && tempGuests.child < 10) {
            setTempGuests({...tempGuests, child: tempGuests.child + 1})
        } else if (age === 'child' && action === "dec" && tempGuests.child > 0) {
            setTempGuests({...tempGuests, child: tempGuests.child - 1})
        }
    }
    const applyFilters = () => {
        setLocation(tempLocation);
        setGuests(tempGuests);
        closeModal();
    }

    return (
        <div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className="modal__grid">
                <div className={activeTab === 'location' ? "modal__grid-item-active" : "modal__grid-item"}
                    onClick={(e) => setActiveClass(e.target)}
                    id="location">
                    <span className="label">Location</span>
                    <span className="text">{tempLocation}</span>
                    <span className="vertical-line"></span>
                </div>
                <div className={activeTab === 'guests' ? "modal__grid-item-active" : "modal__grid-item"}
                    onClick={(e) => setActiveClass(e.target)}
                    id="guests">
                    <span className="label">Guests</span>
                    <span className="text">Add guests</span>
                    <span className="vertical-line"></span>
                </div>
                <div className="modal__grid-item-search" onClick={() => applyFilters()}><i className="fas fa-search"></i>Search</div>
                <div className={`modal__grid-locations ${activeTab === 'location' ? '' : 'hidden'}`}>
                    <div className="modal__grid-locations-item"
                        onClick={(e) => clickOnLoc(e)}>
                            <i className="fas fa-map-marker-alt"></i>Helsinki, Finland
                    </div>
                    <div className="modal__grid-locations-item"
                        onClick={(e) => clickOnLoc(e)}>
                            <i className="fas fa-map-marker-alt"></i>Turku, Finland
                    </div>
                    <div className="modal__grid-locations-item"
                        onClick={(e) => clickOnLoc(e)}>
                            <i className="fas fa-map-marker-alt"></i>Vaasa, Finland
                    </div>
                    <div 
                        className="modal__grid-locations-item"
                        onClick={(e) => clickOnLoc(e)}>
                            <i className="fas fa-map-marker-alt"></i>Oulu, Finland
                    </div>
                </div>
                <div className={`modal__grid-guests ${activeTab === 'guests' ? '' : 'hidden'}`}>
                    <div className="modal__grid-guests-item">
                        <div className="label"><span>Adults</span><br />Ages 13 or above</div>
                        <div className="counter">
                            <span onClick={() => calcGuests('adult', 'dec')}>-</span>
                            <span className="number">{tempGuests.adults}</span>
                            <span onClick={() => calcGuests('adult', 'inc')}>+</span></div>
                        </div>
                    <div className="modal__grid-guests-item">
                        <div className="label"><span>Children</span><br />Ages 2-12</div>
                        <div className="counter">
                            <span onClick={() => calcGuests('child', 'dec')}>-</span>
                            <span className="number">{tempGuests.child}</span>
                            <span onClick={() => calcGuests('child', 'inc')}>+</span></div>
                    </div>
                </div>
            </div>

          </ReactModal>
        </div>
    )
}
export default ModalFilter;