export interface Land {
  landNumber: string;
  district: string;
  division: string;
  area: string;
  areaUnit: string;
  mapReference: string;
}

export interface Owner {
  nic: string;
  fullName: string;
  address: string;
  contactNumber: string;
}

export type DeedStatus = 'ACTIVE' | 'TRANSFERRED';

export interface Deed {
  deedNumber: string;
  landNumber: string; // Reference to Land
  ownerNic: string; // Reference to Owner
  registrationDate: string;
  deedType: string;
  status: DeedStatus;
  previousDeedNumber?: string; // For transfers
  previousOwnerNic?: string; // Snapshot of previous owner
  previousRegistrationDate?: string; // Snapshot of previous registration date
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'TRANSFER';
  details: string;
}
