import { Client } from "./client.model";
import { Organization } from "./organization.model";
import { zones } from "./organization.model";

// CHLORINE_RECORDS
export interface chlorine_records{
  id: string,
  organizationId: Organization,
  recordCode: string,
  testingPointId: string,
  recordDate: string,
  chlorineLevel: DoubleRange,
  acceptable: boolean,
  actionRequired: boolean,
  recordedByUserId: Client,
  observations: string,
  nextChlorinationDate: string,
  createdAt:string
}

export interface createChlorine_records{
  id:string,
  organizationId: Organization,
  recordCode: string,
  testingPointId: string,
  recordDate: string,
  chlorineLevel: DoubleRange,
  acceptable: boolean,
  actionRequired: boolean,
  recordedByUserId: Client,
  observations: string,
  nextChlorinationDate: string,
  createdAt:string
}
export interface UpdateChlorine_records{
  organization_id?: Organization,
  record_code?: string,
  testing_point_id?: testing_points,
  record_date?: string,
  chlorine_level?: 0.8,
  acceptable?: boolean,
  action_required?: boolean,
  recorded_by_user_id?: Client,
  observations?: string,
  next_chlorination_date?: string,
}
//TESTING_POINTS 
export interface testing_points {
  id: string,
  organizationId:Organization,
  pointCode: string,
  pointName: string,
  pointType: PointType, 
  zoneId: zones,
  locationDescription: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  status: Status,
  created_at: string
}

export enum PointType{
  RESERVORIO ='RESERVORIO',
  RED_DISTRIBUCION='RED_DISTRIBUCION',
  DOMICILIO='DOMICILIO'
}

//QUALITY_PARAMETERS
export interface quality_parameters{
  id: string,
  organization_id: Organization,
  parameter_code: string,
  parameter_name: string,
  unit_of_measure: string,
  min_acceptable: number,
  max_acceptable: number,
  optimal_range: {
    min: number,
    max: number
  },
  test_frequency: TestFrequency, // DAILY, WEEKLY, MONTHLY
  status: Status,
  created_at:string

}
// ENUM TESTFREQUENCY
export enum TestFrequency{
  DAILY='DAILY',
  WEEKLY='WEEKLY',
  MONTHLY='MONTHLY'
}

// QUALITY TEST 
export interface QualityTest {
  id:string;
  organizationId: string;
  testCode: string;
  testingPointId: string;
  testDate: string; 
  testType: TestType;
  testedByUserId: string;
  weatherConditions: string;
  waterTemperature: number;
  generalObservations: string;
  status: 'COMPLETED'; // podría también aceptar otros estados si aplican
  results: TestResult[];
}
export interface QualityTestCreateRequest {
  organizationId: string;
  testCode: string;
  testingPointId: string;
  testDate: string; 
  testType: TestType;
  testedByUserId: string;
  weatherConditions: string;
  waterTemperature: number;
  generalObservations: string;
  status: 'COMPLETED'; // podría también aceptar otros estados si aplican
  results: TestResult[];
}

export interface QualityTestUpdateRequest {
  organizationId?: string;
  testCode?: string;
  testingPointId?: string;
  testDate?: string; 
  testType?: TestType;
  testedByUserId?: string;
  weatherConditions?: string;
  waterTemperature?: number;
  generalObservations?: string;
  status?: 'COMPLETED'; // podría también aceptar otros estados si aplican
  results?: TestResult[];
}

export interface TestResult {
  parameterId?: string; // opcional si no se está enviando
  parameterCode: string;
  measuredValue: number;
  unit: string;
  status: StatusResult;
  observations: string;
}

export enum StatusResult{
  ACCEPTABLE = 'ACCEPTABLE',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

// ENUM TESTTYPE
export enum TestType{
  RUTINARIO='RUTINARIO',
  ESPECIAL='ESPECIAL',
  INCIDENCIA='INCIDENCIA'
}

// QUALIYY INCIDENTS
export interface QualityIncident {
  id: string;
  organizationId: string;
  incidentCode: string;
  incidentType: IncidentType; // puedes ampliar con otros posibles
  testingPointId: string | null;
  detectionDate: string | null;
  severity:Severity;
  description: string | null;
  affectedZones: string[];
  immediateActions: string;
  correctiveActions: string;
  resolved: boolean | null;
  resolutionDate: string | null;
  reportedByUserId: string;
  resolvedByUserId: string;
  createdAt: string;
}

export interface QualityIncidentCreateRequest {
  organizationId: string;
  incidentCode: string;
  incidentType: IncidentType; // puedes ampliar con otros posibles
  testingPointId: string | null;
  detectionDate: string | null;
  severity:Severity;
  description: string | null;
  affectedZones: string[];
  immediateActions: string;
  correctiveActions: string;
  resolved: boolean | null;
  resolutionDate: string | null;
  reportedByUserId: string;
  resolvedByUserId: string;
}

export interface QualityIncidentUpdateRequest {
  id?: string;
  organizationId?: string;
  incidentCode?: string;
  incidentType?: IncidentType; // puedes ampliar con otros posibles
  testingPointId?: string;
  detectionDate?: string ;
  severity?:Severity;
  description?: string;
  affectedZones?: string[];
  immediateActions?: string;
  correctiveActions?: string;
  resolved?: boolean;
  resolutionDate?: string;
  reportedByUserId?: string;
  resolvedByUserId?: string;
  createdAt?: string;
}
export enum IncidentType{
    CLORO_BAJO='CLORO_BAJO',
    TURBIDEZ_ALTA ='TURBIDEZ_ALTA',
    CONTAMINACION='CONTAMINACION'
}
export enum Severity{
    LOW ='LOW',
    MEDIUM ='MEDIUM',
    HIGH = 'HIGH',
    CRITICAL='CRITICAL'
}

// EMUN STATUS GLOBAL
export enum Status{
    ACTIVE ='ACTIVE',
    INACTIVE = 'INACTIVE'
}