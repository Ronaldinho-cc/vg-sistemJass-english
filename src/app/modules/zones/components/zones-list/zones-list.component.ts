import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Status, zones } from '../../../../core/models/zones.model';
import { ZonesService } from '../../../../core/services/zones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zones-list',
  imports: [CommonModule,FormsModule],
templateUrl: './zones-list.component.html',
  styleUrl: './zones-list.component.css'
})
export class ZonesListComponent implements OnInit{
  zones: zones[] = [];
  filteredZones: zones[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'todos';
  loading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success'|'error'|'info' = 'success';

  constructor(
    private zonesService: ZonesService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.loadZones();
  }

  loadZones() {
    this.loading = true;
    this.zonesService.getAllZones().subscribe({
      next: (zones) => {
        this.zones = zones;
        this.filteredZones=[...zones];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar organizaciones:', error);
        this.showAlertMessage('Error al cargar organizations', 'error');
        this.loading = false;
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
    this.filteredZones = this.zones.filter(zones => {
      // Filtro de búsqueda
      const matchesSearch = this.searchTerm === '' ||
        zones.zone_code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        zones.zone_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        zones.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      // Filtro de estado
      const matchesStatus = this.selectedStatus === 'todos' ||
        (this.selectedStatus === 'activo' && zones.status === Status.ACTIVE) ||
        (this.selectedStatus === 'inactivo' && zones.status === Status.INACTIVE);

      return matchesSearch && matchesStatus;
    });
  }

  deleteOrganization(zone: zones): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${zone.zone_code}?`)) {
      this.zonesService.deleteZones(zone.zone_id).subscribe({
        next: () => {
          const zonesIndex = this.zones.findIndex(z => z.zone_id === zone.zone_id);
          if (zonesIndex !== -1) {
            this.zones[zonesIndex].status = Status.INACTIVE;
          }
          this.selectedStatus = 'inactivo';
          this.applyFilters();
          this.showAlertMessage(`Zones ${zone.zone_name} eliminada correctamente`, 'success');
        },
        error: (error: any) => {
          console.error('Error deleting zones:', error);
          this.showAlertMessage('Error al eliminar zones', 'error');
        }
      });
    }
  }

  restoreOrganization(zone: zones): void {
    if (confirm(`¿Estás seguro de que deseas restaurar a ${zone.zone_name}?`)) {
      this.zonesService.restoreZones(zone.zone_id).subscribe({
        next: (updateZone) => {
          const zonesIndex = this.zones.findIndex(z => z.zone_id === zone.zone_id);
          if (zonesIndex !== -1) {
            this.zones[zonesIndex]= updateZone;
          }

          this.applyFilters();
          this.showAlertMessage(`Zonas ${zone.zone_name} restaurada correctamente`, 'success');
        },
        error: (error: any) => {
          console.error('Error al restaurar Zonas:', error);
          this.showAlertMessage('Error al restaurar Zonas', 'error');
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

  editZones(zonesId: string): void {
    this.router.navigate(['/admin/zones/edit', zonesId]);
  }

  getStatusClass(status: Status): string {
    return status === Status.ACTIVE ?
      'bg-green-100 text-green-800' :
      'bg-red-100 text-red-800';
  }

  dismissAlert(): void {
    this.showAlert = false;
  }

  trackByZonesId(index: number, zone: zones): string {
    return zone.zone_id;
  }

  addNewZones(): void {
    this.router.navigate(['/admin/zones/new']);
  }

  getActiveZonesCount(): number {
    return Array.isArray(this.zones) ? 
      this.zones.filter(z => z.status === Status.ACTIVE).length : 0;
  }

  getInactiveZonesCount(): number {
    return Array.isArray(this.zones) ? 
      this.zones.filter(zone => zone.status === Status.INACTIVE).length : 0;
  }
}
