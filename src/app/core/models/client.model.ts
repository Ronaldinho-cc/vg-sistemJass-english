// src/app/core/models/client.model.ts
export interface Address {
     detail: string | null;
     localityId: string | null;
     localityName: string;
     streetId: string | null;
     streetName: string | null;
}

export interface WaterBox {
     boxId: string;
     code: string;
     type: string;
}

export enum Role {
     ADMIN = 'ADMIN',
     CLIENT = 'CLIENT',
     USER = 'USER'
}

export enum Status {
     ACTIVE = 'ACTIVE',
     INACTIVE = 'INACTIVE'
}

export interface Client {
     id: string;
     branchOfficeId: string;
     documentType: string;
     documentNumber: string;
     firstName: string;
     lastName: string;
     phone: string;
     email: string;
     address: Address;
     role: Role;
     status: Status;
     registrationDate: string;
     waterBoxes: WaterBox[];
}

export interface ClientCreate {
     branchOfficeId: string;
     documentType: string;
     documentNumber: string;
     firstName: string;
     lastName: string;
     phone: string;
     email: string;
     address: Address;
     role: Role;
     waterBoxes: WaterBox[];
}

export interface ClientUpdate {
     branchOfficeId?: string;
     documentType?: string;
     documentNumber?: string;
     firstName?: string;
     lastName?: string;
     phone?: string;
     email?: string;
     address?: Address;
     role?: Role;
     status?: Status;
     waterBoxes?: WaterBox[];
}
