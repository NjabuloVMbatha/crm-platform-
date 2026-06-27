import React from 'react';
import ClientCard from './ClientCard';

const ClientList = ({ isLoading, error, clients }) => {

  if (isLoading) {
    return <p className="loading-message">Loading clients...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (clients.length === 0) {
    return <p className="loading-message">No clients found. Add one to get started!</p>;
  }

  return (
    <div className="client-list-grid">
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
};

export default ClientList;