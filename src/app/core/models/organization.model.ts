export interface Organization{
    organization_id:string;
    name:string;
    address:string;
    phone:string;
    legalRepresentative:string;
    status:Status;
}
export enum Status{
    ACTIVE =  'ACTIVE',
    INACTIVE= 'INACTIVE'
}
export interface OrganizationCreate{
    name:string;
    address:string;
    phone:string;
    legalRepresentative:string;
}

export interface OrganizationUpdate{
    name?:string;
    address?:string;
    phone?:string;
    legalRepresentative?:string;
}

// ZONES 
export interface zones{
  zone_id: string,
  organization_id:Organization,
  zone_code: string,
  zone_name: string,
  description: string,
  status: Status,
  created_at: string
}

export interface zonesCreate{
  organization_id:Organization,
  zone_code: string,
  zone_name: string,
  description: string,
}

export interface zonesUpdate{
  organization_id?:Organization,
  zone_code?: string,
  zone_name?: string,
  description?: string,
}

