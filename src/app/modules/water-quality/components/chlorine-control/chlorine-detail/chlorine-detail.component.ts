import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WaterQualityService } from '../../../../../core/services/water-quality.service';
import { chlorine_records } from '../../../../../core/models/water-quality.model';

@Component({
  selector: 'app-chlorine-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chlorine-detail.component.html',
  styleUrl: './chlorine-detail.component.css'
})
export class ChlorineDetailComponent implements OnInit {
  chlorine: chlorine_records | null = null;
  loading = false;
  error = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qualityService: WaterQualityService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadChlorine(id);
    }
  }

  private loadChlorine(id: string): void {
    this.loading = true;
    this.qualityService.getChlorineById(id).subscribe({
      next: (data) => {
        this.chlorine = data;
        this.loading = false;
        console.log('Datos del registro:', data);
      },
      error: (error) => {
        console.error('Error al cargar el registro:', error);
        this.error = true;
        this.errorMessage = 'Error al cargar el registro';
        this.loading = false;
      }
    });
  }

  getStatusClass(acceptable: boolean): string {
    return acceptable 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  }

  getStatusText(acceptable: boolean): string {
    return acceptable ? 'Aceptable' : 'No Aceptable';
  }

  getActionClass(required: boolean): string {
    return required 
      ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  }

  getActionText(required: boolean): string {
    return required ? 'Se requiere acción' : 'No requiere acción';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/qualitys']);
  }

  editRecord(): void {
    if (this.chlorine) {
      this.router.navigate(['/admin/qualitys/edit', this.chlorine.id]);
    }
  }
}
