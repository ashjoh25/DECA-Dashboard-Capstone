import React, { useState } from 'react';
import './CreateFundraiserBtn.css';
import axios from '../../../services/axiosConfig';

const CreateFundraiserBtn = ({ setFundraisers }) => {
  const [newFundraiser, setNewFundraiser] = useState({ fund_name: '', fund_description:'', fund_location: '', fund_date: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddFundraiser = async () => {
    if (!newFundraiser.fund_name || !newFundraiser.fund_description || !newFundraiser.fund_location || !newFundraiser.fund_date) {
      alert('Please provide a title, description, location, and date.');
      return;
    }
    console.log("Adding New Fundraiser:", {
      fund_name: newFundraiser.fund_name,
      fund_description: newFundraiser.fund_description,
      fund_location: newFundraiser.fund_location, 
      fund_date: newFundraiser.fund_date

    });

    try {
      // Add new fundraiser to the backend
      const response = await axios.post('http://localhost:8081/fundraisers/add', {
        fund_name: newFundraiser.fund_name,
        fund_description: newFundraiser.fund_description,
        fund_location: newFundraiser.fund_location, 
        fund_location: newFundraiser.fund_date
      });

      

      // Add the new fundraiser to the current list of fundraisers (state)
      setFundraisers(prevFundraisers => [...prevFundraisers, response.data]);

      // Close popup and reset input fields
      setIsPopupOpen(false);
      setNewFundraiser({ fund_name: '', fund_description: '', fund_location:'', fund_date:'' });
    } catch (error) {
      console.error('Error adding fundraiser:', error);
      alert('Failed to add fundraiser.');
    }
  };

  

  return (
    <div className="create-fundraiser-container">
      <button className="center-button" onClick={() => setIsPopupOpen(true)}>
        Create Fundraiser
      </button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Fundraiser</h2>
            <label>
              Name:
              <input
                type="text"
                value={newFundraiser.fund_name}
                onChange={(e) => setNewFundraiser({ ...newFundraiser, fund_name: e.target.value })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newFundraiser.fund_description}
                onChange={(e) => setNewFundraiser({ ...newFundraiser, fund_description: e.target.value })}
              />
            </label>
            <label>
              Date: 
              <input
              type="date"
              value={newFundraiser.fund_date}
              onChange={(e) => setNewFundraiser({...newFundraier, fund_date: e.target.value})}
              />
            </label>
            <label>
              Location: 
              <input
              type="text"
              value={newFundraiser.fund_location}
              onChange={(e) => setNewFundraiser({...newFundraier, fund_location: e.target.value})}
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleAddFundraiser}>Create</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFundraiserBtn;
