import { Component } from '@angular/core';
import { branch, Status } from '../../../../core/models/branch.model';
import { BranchService } from '../../../../core/services/branch.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent {
  branchs: branch[] = [];
  filteredBranchs: branch[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'todos';
  loading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success'|'error'|'info' = 'success';

  constructor(
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.loadBranchs();
  }

  loadBranchs() {
    this.loading = true;
    console.log('Iniciando carga de organizaciones...');
    this.branchService.getAllBranches().subscribe({
      next: (branchs) => {
        console.log('Datos recibidos del servicio:', branchs);
        this.branchs = Array.isArray(branchs) ? 
          branchs.map(bra => ({
            ...bra,
            status: Boolean(bra.status) ? Status.ACTIVE : Status.INACTIVE
          })) : [];
        console.log('Organizaciones procesadas:', this.branchs);
        this.filteredBranchs = [...this.branchs];
        console.log('Organizaciones filtradas:', this.filteredBranchs);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar organizaciones:', error);
        this.showAlertMessage('Error al cargar organizations', 'error');
        this.loading = false;
        this.branchs = [];
        this.filteredBranchs = [];
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
    this.filteredBranchs = this.branchs.filter(branch => {
      // Filtro de búsqueda
      const matchesSearch = this.searchTerm === '' ||
        branch.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro de estado
      const matchesStatus = this.selectedStatus === 'todos' ||
        (this.selectedStatus === 'activo' && branch.status === Status.ACTIVE) ||
        (this.selectedStatus === 'inactivo' && branch.status === Status.INACTIVE);

      return matchesSearch && matchesStatus;
    });
  }

  deleteBranch(branch: branch): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${branch.name}?`)) {
      this.branchService.deleteBranch(branch.branchId).subscribe({
        next: () => {
          const branchIndex = this.branchs.findIndex(b => b.branchId === branch.branchId);
          if (branchIndex !== -1) {
            this.branchs[branchIndex].status = Status.INACTIVE;
          }
          this.selectedStatus = 'inactivo';
          this.applyFilters();
          this.showAlertMessage(`Organización ${branch.name} eliminada correctamente`, 'success');
        },
        error: (error: any) => {
          console.error('Error al eliminar organización:', error);
          this.showAlertMessage('Error al eliminar organización', 'error');
        }
      });
    }
  }

  restoreBranch(branch: branch): void {
    if (confirm(`¿Estás seguro de que deseas restaurar a ${branch.name}?`)) {
      this.branchService.restoreBranch(branch.branchId).subscribe({
        next: () => {
          const branchIndex = this.branchs.findIndex(b => b.branchId === branch.branchId);
          if (branchIndex !== -1) {
            this.branchs[branchIndex].status = Status.ACTIVE;
          }
          this.selectedStatus = 'activo';
          this.applyFilters();
          this.showAlertMessage(`Organización ${branch.name} restaurada correctamente`, 'success');
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

  editBranch(branchId: string): void {
    this.router.navigate(['/admin/branchs/edit', branchId]);
  }

  getStatusClass(status: Status): string {
    return status === Status.ACTIVE ?
      'bg-green-100 text-green-800' :
      'bg-red-100 text-red-800';
  }

  dismissAlert(): void {
    this.showAlert = false;
  }

  trackByBranchId(index: number, branch: branch): string {
    return branch.branchId;
  }

  addNewBranch(): void {
    this.router.navigate(['/admin/branchs/new']);
  }

  getActiveBranchCount(): number {
    return Array.isArray(this.branchs) ? 
      this.branchs.filter(o => o.status === Status.ACTIVE).length : 0;
  }

  getInactiveBranchCount(): number {
    return Array.isArray(this.branchs) ? 
      this.branchs.filter(branch => branch.status === Status.INACTIVE).length : 0;
  }
}
