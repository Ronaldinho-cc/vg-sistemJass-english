import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Organization, Status } from '../../../../core/models/organization.model';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../../core/services/organization.service';

@Component({
  selector: 'app-organization-list',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent implements OnInit{
  organizations: Organization[] = [];
  filteredOrganizations: Organization[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'todos';
  loading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success'|'error'|'info' = 'success';

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.loading = true;
    console.log('Iniciando carga de organizaciones...');
    this.organizationService.getAllOrganization().subscribe({
      next: (organizations) => {
        console.log('Datos recibidos del servicio:', organizations);
        this.organizations = Array.isArray(organizations) ? 
          organizations.map(org => ({
            ...org,
            status: Boolean(org.status) ? Status.ACTIVE : Status.INACTIVE
          })) : [];
        console.log('Organizaciones procesadas:', this.organizations);
        this.filteredOrganizations = [...this.organizations];
        console.log('Organizaciones filtradas:', this.filteredOrganizations);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar organizaciones:', error);
        this.showAlertMessage('Error al cargar organizations', 'error');
        this.loading = false;
        this.organizations = [];
        this.filteredOrganizations = [];
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  getStatusLabel(status: Status): string {
    return status === Status.ACTIVE ? 'Activo' : 'Inactivo';
  }

  private applyFilters(): void {
    this.filteredOrganizations = this.organizations.filter(organization => {
      // Filtro de búsqueda
      const matchesSearch = this.searchTerm === '' ||
        organization.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        organization.legalRepresentative.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        organization.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        organization.phone.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro de estado
      const matchesStatus = this.selectedStatus === 'todos' ||
        (this.selectedStatus === 'activo' && organization.status === Status.ACTIVE) ||
        (this.selectedStatus === 'inactivo' && organization.status === Status.INACTIVE);

      return matchesSearch && matchesStatus;
    });
  }

  deleteOrganization(organization: Organization): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${organization.name}?`)) {
      this.organizationService.deleteOrganization(organization.organization_id).subscribe({
        next: () => {
          const organizationIndex = this.organizations.findIndex(o => o.organization_id === organization.organization_id);
          if (organizationIndex !== -1) {
            this.organizations[organizationIndex].status = Status.INACTIVE;
          }
          this.selectedStatus = 'inactivo';
          this.applyFilters();
          this.showAlertMessage(`Organización ${organization.name} eliminada correctamente`, 'success');
        },
        error: (error: any) => {
          console.error('Error al eliminar organización:', error);
          this.showAlertMessage('Error al eliminar organización', 'error');
        }
      });
    }
  }

  restoreOrganization(organization: Organization): void {
    if (confirm(`¿Estás seguro de que deseas restaurar a ${organization.name}?`)) {
      this.organizationService.restoreOrganization(organization.organization_id).subscribe({
        next: () => {
          const organizationIndex = this.organizations.findIndex(o => o.organization_id === organization.organization_id);
          if (organizationIndex !== -1) {
            this.organizations[organizationIndex].status = Status.ACTIVE;
          }
          this.selectedStatus = 'activo';
          this.applyFilters();
          this.showAlertMessage(`Organización ${organization.name} restaurada correctamente`, 'success');
        },
        error: (error: any) => {
          console.error('Error al restaurar organización:', error);
          this.showAlertMessage('Error al restaurar organización', 'error');
        }
      });
    }
  }

  private showAlertMessage(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  editOrganization(organizationId: string): void {
    this.router.navigate(['/admin/organizations/edit', organizationId]);
  }

  getStatusClass(status: Status): string {
    return status === Status.ACTIVE ?
      'bg-green-100 text-green-800' :
      'bg-red-100 text-red-800';
  }

  dismissAlert(): void {
    this.showAlert = false;
  }

  trackByOrganizationId(index: number, organization: Organization): string {
    return organization.organization_id;
  }

  addNewOrganization(): void {
    this.router.navigate(['/admin/organizations/new']);
  }

  getActiveOrganizationCount(): number {
    return Array.isArray(this.organizations) ? 
      this.organizations.filter(o => o.status === Status.ACTIVE).length : 0;
  }

  getInactiveOrganizationCount(): number {
    return Array.isArray(this.organizations) ? 
      this.organizations.filter(organization => organization.status === Status.INACTIVE).length : 0;
  }
}
