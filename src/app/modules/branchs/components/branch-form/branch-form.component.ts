import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../../core/services/branch.service';
import { branch, Status } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-branch-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css'
})
export class BranchFormComponent {
  branchForm: FormGroup;
  isEditMode: boolean = false;
  branchId: string | null = null;
  loading: boolean = false;
  submitting = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'info' = 'success';
  showAlert = false;

  // Opciones para selects
  statuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
    });
  }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.branchId;

    if (this.isEditMode && this.branchId) {
      this.loadOrganization(this.branchId);
    }
  }

  loadOrganization(id: string): void {
    this.loading = true;
    this.branchService.getBranchById(id).subscribe({
      next: (branch) => {
        if (branch) {
          this.populateForm(branch);
        } else {
          this.showAlertMessage('Organización no encontrada', 'error');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la organización:', error);
        this.showAlertMessage('Error al cargar la organización', 'error');
        this.loading = false;
      }
    });
  }

  populateForm(branch: branch): void {
    if (!branch) {
      console.error('No se recibió una organización válida');
      return;
    }

    this.branchForm.patchValue({
      name: branch.name || '',
      address: branch.address || '',
      phone: branch.phone || '',
      email:branch.email  || '',
      orgizationId:branch.organizationId,
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const formData = this.branchForm.value;
      const { status, ...organizationData } = formData;

      console.log('Datos del formulario:', formData);
      console.log('Datos a enviar:', organizationData);

      if (this.isEditMode && this.branchId) {
        console.log('Modo edición - ID:', this.branchId);
        this.branchService.updateBranch(this.branchId, organizationData).subscribe({
          next: (response) => {
            console.log('Respuesta de actualización:', response);
            this.showAlertMessage('Organización actualizada correctamente', 'success');
            setTimeout(() => {
              this.router.navigate(['/admin/organizations']);
            }, 2000);
          },
          error: (error) => {
            console.error('Error al actualizar la organización:', error);
            this.showAlertMessage('Error al actualizar la organización', 'error');
          }
        });
      } else {
        console.log('Modo creación');
        this.branchService.createBranch(organizationData).subscribe({
          next: (response) => {
            console.log('Respuesta de creación:', response);
            this.showAlertMessage('Organización creada correctamente', 'success');
            setTimeout(() => {
              this.router.navigate(['/admin/organizations']);
            }, 2000);
          },
          error: (error) => {
            console.error('Error al crear la organización:', error);
            this.showAlertMessage('Error al crear la organización', 'error');
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.branchForm);
      console.log('Formulario inválido:', this.branchForm.errors);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showAlertMessage(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    // Solo redirigir si es un error y no estamos en modo edición
    if (type === 'error' && !this.isEditMode) {
      setTimeout(() => {
        this.router.navigate(['/admin/organizations']);
      }, 2000);
    }
  }

  dismissAlert(): void {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.branchForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control.hasError('pattern')) {
      switch (controlName) {
        case 'name':
        case 'legalRepresentative':
          return 'Solo se permiten letras y espacios';
        case 'phone':
          return 'El teléfono debe tener 9 dígitos y comenzar con 9';
        default:
          return 'Formato inválido';
      }
    }

    return '';
  }

  onNameInput(event: any, fieldName: string): void {
    const value = event.target.value;
    // Eliminar números y símbolos, permitir letras, espacios y caracteres especiales del español
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.branchForm.get(fieldName)?.setValue(cleanValue);
  }

  onPhoneInput(event: any): void {
    const value = event.target.value;
    // Solo números y limitar a 9 caracteres
    const numericValue = value.replace(/[^0-9]/g, '');
    event.target.value = numericValue.slice(0, 9);
  }

  // Métodos para validación y errores
  isFieldInvalid(field: string): boolean {
    const control = this.branchForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  cancel(): void {
    this.router.navigate(['/admin/organizations']);
  }
}


