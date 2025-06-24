import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../../../../core/models/client.model';
import { chlorine_records } from '../../../../core/models/water-quality.model';
import { WaterQualityService } from '../../../../core/services/water-quality.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chlorine-control',
  imports: [CommonModule,FormsModule],
  templateUrl: './chlorine-control.component.html',
  styleUrl: './chlorine-control.component.css'
})
export class ChlorineControlComponent implements OnInit {
  chlorine: chlorine_records[] = [];
  filteredchlorine: chlorine_records[] = [];
  loading = false;
  searchTerm = '';
  selectedStatus = 'todos';
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' | 'info' = 'info';

  constructor(
    private waterQualityService: WaterQualityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadChlorine();
  }

  loadChlorine(): void {
    this.loading = true;
    this.waterQualityService.getAllChlorine().subscribe({
      next: (data) => {
        this.chlorine = data;
        this.filteredchlorine = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar registros:', error);
        this.showAlertMessage('Error al cargar los registros', 'error');
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.filterRecords();
  }

  onStatusChange(): void {
    this.filterRecords();
  }

  filterRecords(): void {
    this.filteredchlorine = this.chlorine.filter(record => {
      const matchesSearch = !this.searchTerm || 
        record.recordCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.testingPointId.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'todos' ||
        (this.selectedStatus === 'aceptable' && record.acceptable) ||
        (this.selectedStatus === 'no-aceptable' && !record.acceptable);

      return matchesSearch && matchesStatus;
    });
  }

  addNewChlorine(): void {
    this.router.navigate(['/admin/water-quality/new']);
  }

  editChlorine(id: string): void {
    this.router.navigate(['/admin/water-quality/edit', id]);
  }
  detailchlorine(id:string):void{
    this.router.navigate(['/admin/water-quality/detail', id])
  }

  deleteChlorine(chlorine: chlorine_records): void {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      this.waterQualityService.deleteChlorine(chlorine.id).subscribe({
        next: () => {
          this.showAlertMessage('Registro eliminado exitosamente', 'success');
          this.loadChlorine();
        },
        error: (error) => {
          console.error('Error al eliminar registro:', error);
          this.showAlertMessage('Error al eliminar el registro', 'error');
        }
      });
    }
  }

  getAcceptableLabel(acceptable: boolean): string {
    return acceptable ? 'True' : 'False';
  }

  getAcceptableClass(acceptable: boolean): string {
    return acceptable 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  getActionRequiredLabel(required: boolean): string {
    return required ? 'Sí' : 'No';
  }

  getActionRequiredClass(required: boolean): string {
    return required 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-gray-100 text-gray-800';
  }

  getActiveRecordsCount(): number {
    return this.chlorine.filter(record => record.acceptable).length;
  }

  getInactiveRecordsCount(): number {
    return this.chlorine.filter(record => !record.acceptable).length;
  }

  showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      this.dismissAlert();
    }, 5000);
  }

  dismissAlert(): void {
    this.showAlert = false;
  }

  trackByChlorineId(index: number, chlorine: chlorine_records): string {
    return chlorine.id;
  }
}
