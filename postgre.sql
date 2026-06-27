DROP TABLE IF EXISTS deals;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,                   
    name VARCHAR(255) NOT NULL,              
    email VARCHAR(255) UNIQUE,               
    phone VARCHAR(50),                       
    status VARCHAR(50) DEFAULT 'Lead',      
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE deals (
    id SERIAL PRIMARY KEY,
    deal_name VARCHAR(255) NOT NULL,
    value DECIMAL(12, 2),                    
    stage VARCHAR(50) DEFAULT 'Discovery',   
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clients (name, email, phone, status) VALUES
('Innovate Corp', 'contact@innovate.com', '555-0101', 'Qualified'),
('Data Solutions Ltd', 'info@datasolutions.com', '555-0102', 'Lead'),
('Quantum Industries', 'press@quantum.com', '555-0103', 'Customer');

INSERT INTO deals (deal_name, value, stage, client_id) VALUES
('Q3 Enterprise Software License', 25000.00, 'Proposal', 1),
('Annual Support Contract', 5000.00, 'Negotiation', 1),
('New Server Infrastructure', 75000.00, 'Closed-Won', 3);