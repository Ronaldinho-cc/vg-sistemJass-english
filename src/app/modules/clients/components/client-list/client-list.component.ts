import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { Client, Status } from '../../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  selectedSector: string = 'todos';
  selectedStatus: string = 'todos';
  loading: boolean = false;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'info' = 'success';

  sectors: string[] = ['todos'];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = [...clients];
        this.extractSectors();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.showAlertMessage('Error al cargar usuarios', 'error');
        this.loading = false;
      }
    });
  }

  private extractSectors(): void {
    const uniqueSectors = new Set<string>();
    this.clients.forEach(client => {
      if (client.address.localityName) {
        uniqueSectors.add(client.address.localityName);
      }
    });
    this.sectors = ['todos', ...Array.from(uniqueSectors)];
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSectorChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredClients = this.clients.filter(client => {
      const matchesSearch = this.searchTerm === '' ||
        client.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.documentNumber.includes(this.searchTerm) ||
        client.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesSector = this.selectedSector === 'todos' ||
        client.address.localityName === this.selectedSector;

      const matchesStatus = this.selectedStatus === 'todos' ||
        (this.selectedStatus === 'activo' && client.status === Status.ACTIVE) ||
        (this.selectedStatus === 'inactivo' && client.status === Status.INACTIVE);

      return matchesSearch && matchesSector && matchesStatus;
    });
  }

  addNewClient(): void {
    this.router.navigate(['/admin/clients/new']);
  }

  editClient(clientId: string): void {
    this.router.navigate(['/admin/clients/edit', clientId]);
  }

  deleteClient(client: Client): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${this.getFullName(client)}?`)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: () => {
          // Actualizar el estado del cliente localmente
          const clientIndex = this.clients.findIndex(c => c.id === client.id);
          if (clientIndex !== -1) {
            this.clients[clientIndex].status = Status.INACTIVE;
          }

          // Cambiar automáticamente al filtro de inactivos
          this.selectedStatus = 'inactivo';
          this.applyFilters();

          this.showAlertMessage(`Usuario ${this.getFullName(client)} eliminado correctamente`, 'success');
        },
        error: (error) => {
          console.error('Error deleting client:', error);
          this.showAlertMessage('Error al eliminar usuario', 'error');
        }
      });
    }
  }

  restoreClient(client: Client): void {
    if (confirm(`¿Deseas restaurar a ${this.getFullName(client)}?`)) {
      this.clientService.restoreClient(client.id).subscribe({
        next: (updatedClient) => {
          const clientIndex = this.clients.findIndex(c => c.id === client.id);
          if (clientIndex !== -1) {
            this.clients[clientIndex] = updatedClient;
          }

          this.applyFilters();
          this.showAlertMessage(`Usuario ${this.getFullName(updatedClient)} restaurado correctamente`, 'success');
        },
        error: (error) => {
          console.error('Error restoring client:', error);
          this.showAlertMessage('Error al restaurar usuario', 'error');
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

  dismissAlert(): void {
    this.showAlert = false;
  }

  getFullName(client: Client): string {
    return `${client.firstName} ${client.lastName}`;
  }

  getWaterBoxCount(client: Client): number {
    return client.waterBoxes?.length || 0;
  }

  getStatusLabel(status: Status): string {
    return status === Status.ACTIVE ? 'Activo' : 'Inactivo';
  }

  getStatusClass(status: Status): string {
    return status === Status.ACTIVE ?
      'bg-green-100 text-green-800' :
      'bg-red-100 text-red-800';
  }

  trackByClientId(index: number, client: Client): string {
    return client.id;
  }

  getActiveClientsCount(): number {
    return this.clients.filter(client => client.status === Status.ACTIVE).length;
  }

  getInactiveClientsCount(): number {
    return this.clients.filter(client => client.status === Status.INACTIVE).length;
  }
}
