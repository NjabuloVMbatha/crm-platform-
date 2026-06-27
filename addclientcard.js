import React from 'react';
import { FaEnvelope, FaPhone, FaDollarSign, FaBoxOpen } from 'react-icons/fa';

const ClientCard = ({ client }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="client-card">
      <div className="card-header">
        <h3>{client.name}</h3>
        <span className={`status-badge status-${client.status?.toLowerCase()}`}>{client.status}</span>
      </div>
      <div className="card-body">
        <p><FaEnvelope className="icon" /> {client.email}</p>
        <p><FaPhone className="icon" /> {client.phone || 'N/A'}</p>
      </div>
      <div className="card-footer">
        <div>
          <FaBoxOpen className="icon" />
          <span>{client.deal_count} Deals</span>
        </div>
        <div>
          <FaDollarSign className="icon" />
          <span>{formatCurrency(client.total_deal_value)}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;