export enum RolesUsers {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    SUPERVISOR = 'SUPERVISOR'
  }
  
  export enum StatusUsers {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED'
  }
  
  export interface AddressUsers {
    detail: string;
    localityId: string;
    localityName: string;
    streetId: string;
    streetName: string;
  }
  
  export interface WaterBoxes {
    boxId: string;
    code: string;
    type: string;
  }
  
  export interface User {
    id: string;
    branchOfficeId: string;
    documentType: string;
    documentNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: AddressUsers;
    role: RolesUsers;
    status: StatusUsers;
    registrationDate: string;
    waterBoxes: WaterBoxes[];
  }
  
  export interface UserCreateRequest {
    branchOfficeId: string;
    documentType: string;
    documentNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: AddressUsers;
    role: RolesUsers;
  }
  
  export interface UserUpdateRequest {
    branchOfficeId?: string;
    documentType?: string;
    documentNumber?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    address?: AddressUsers;
    role?: RolesUsers;
  }
  
  export interface ResponseDto<T> {
    success: boolean;
    data: T;
    message?: string;
  }