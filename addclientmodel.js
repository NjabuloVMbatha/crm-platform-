import React, { useState } from 'react';

const API_URL = 'http://localhost:5000';

function AddClientModal({ isOpen, onClose, onClientAdded }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setError(null); 

    fetch(`${API_URL}/api/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to add client. Please try again.');
      }
      return res.json();
    })
    .then(addedClient => {
      onClientAdded(addedClient);
      
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '' }); 
      onClose(); 
    })
    .catch(err => {
      console.error("Error adding client:", err);
      setError(err.message); 
      setIsSubmitting(false);
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {}
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Client</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {}
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Client Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Client'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClientModal;