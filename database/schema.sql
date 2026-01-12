-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Lands Table
CREATE TABLE IF NOT EXISTS lands (
    land_number VARCHAR(50) PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    division VARCHAR(100) NOT NULL,
    area DECIMAL(10, 2) NOT NULL,
    area_unit VARCHAR(20) NOT NULL,
    map_reference VARCHAR(100)
);

-- Owners Table
CREATE TABLE IF NOT EXISTS owners (
    nic VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(20)
);

-- Deeds Table
CREATE TABLE IF NOT EXISTS deeds (
    deed_number VARCHAR(50) PRIMARY KEY,
    land_number VARCHAR(50) NOT NULL REFERENCES lands(land_number),
    owner_nic VARCHAR(20) NOT NULL REFERENCES owners(nic),
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    deed_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE', 'TRANSFERRED')),
    previous_deed_number VARCHAR(50) REFERENCES deeds(deed_number),
    previous_owner_nic VARCHAR(20), -- Snapshot of previous owner NIC
    previous_registration_date DATE, -- Snapshot of previous registration date
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "user" VARCHAR(100) NOT NULL, -- "user" is a reserved keyword, so we quote it
    action VARCHAR(20) NOT NULL, -- Removed constraint to allow extended actions like LOGIN, LOGOUT, SEARCH
    details TEXT
);

-- Admins Table
-- Dropping existing if conflicting type
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS admins; -- Cleanup old table if exists
CREATE TABLE admin (
    use_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_role VARCHAR(50),
    full_name VARCHAR(200)
);

-- Indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_deeds_land_number ON deeds(land_number);
CREATE INDEX IF NOT EXISTS idx_deeds_owner_nic ON deeds(owner_nic);
CREATE INDEX IF NOT EXISTS idx_deeds_status ON deeds(status);
CREATE INDEX IF NOT EXISTS idx_owners_full_name ON owners(full_name);
