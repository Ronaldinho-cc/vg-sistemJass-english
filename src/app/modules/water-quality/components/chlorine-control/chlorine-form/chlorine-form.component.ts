import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaterQualityService } from '../../../../../core/services/water-quality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { chlorine_records, createChlorine_records, UpdateChlorine_records } from '../../../../../core/models/water-quality.model';

@Component({
  selector: 'app-chlorine-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './chlorine-form.component.html',
  styleUrl: './chlorine-form.component.css'
})
export class ChlorineFormComponent implements OnInit {
  chlorineForm: FormGroup;
  isEditMode = false;
  chlorineId: string | null = null;
  loading = false;
  submitting = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  errorMessage = '';
  originalFormValue: any = null;

  constructor(
    private fb: FormBuilder,
    private qualityService: WaterQualityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.chlorineForm = this.createForm();
  }

  ngOnInit(): void {
    this.chlorineId = this.route.snapshot.paramMap.get('id');
    if (this.chlorineId) {
        this.isEditMode = true;
        this.loadChlorine();
      }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      organizationId: ['', Validators.required],
      recordCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      testingPointId: ['', [Validators.required]],
      recordDate: ['', [Validators.required]],
      chlorineLevel: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      acceptable: [false, Validators.required],
      actionRequired: [false, Validators.required],
      recordedByUserId: ['', [Validators.required]],
      observations: ['', [Validators.required, Validators.minLength(10)]],
      nextChlorinationDate: ['', Validators.required],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.chlorineForm.get(fieldName);
    if (!field) return false;

    // En modo edición, solo validar si el campo ha sido modificado
    if (this.isEditMode) {
      const currentValue = field.value;
      const originalValue = this.originalFormValue?.[fieldName];
      const isModified = JSON.stringify(currentValue) !== JSON.stringify(originalValue);
      
      return isModified && field.invalid && (field.dirty || field.touched);
  }

    return field.invalid && (field.dirty || field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.chlorineForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es requerido';
    if (field.errors['pattern']) return 'Formato inválido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}`;
    if (field.errors['max']) return `El valor máximo es ${field.errors['max'].max}`;

    return 'Campo inválido';
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.chlorineForm.controls).forEach(key => {
      const control = this.chlorineForm.get(key);
      control?.markAsTouched();
    });
  }

  private loadChlorine(): void {
    this.loading = true;
    if (this.chlorineId) {
      this.qualityService.getChlorineById(this.chlorineId).subscribe({
        next: (chlorine) => {
          console.log('Datos cargados del registro:', chlorine);
          this.populateForm(chlorine);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.showErrorAlert = true;
          this.errorMessage = 'Error al cargar el registro';
        }
      });
    }
  }

  private populateForm(chlorine: chlorine_records): void {
    const formValue = {
      organizationId: chlorine.organizationId,
      recordCode: chlorine.recordCode,
      testingPointId: chlorine.testingPointId,
      recordDate: chlorine.recordDate,
      chlorineLevel: chlorine.chlorineLevel,
      acceptable: chlorine.acceptable,
      actionRequired: chlorine.actionRequired,
      recordedByUserId: chlorine.recordedByUserId,
      observations: chlorine.observations,
      nextChlorinationDate: chlorine.nextChlorinationDate
    };

    // Guardar el valor original para comparaciones
    this.originalFormValue = { ...formValue };
    console.log('Valores originales guardados:', this.originalFormValue);
    
    this.chlorineForm.patchValue(formValue);
    console.log('Formulario poblado con valores:', this.chlorineForm.value);
  }

  onSubmit(): void {
    console.log('Formulario actual:', this.chlorineForm.value);
    
    if (this.isEditMode) {
      // En modo edición, solo validar los campos modificados
      const modifiedFields = this.getModifiedFields();
      console.log('Campos modificados:', modifiedFields);
      
      if (Object.keys(modifiedFields).length === 0) {
        this.showErrorAlert = true;
        this.errorMessage = 'No se han realizado cambios';
        return;
      }

      // Validar solo los campos modificados
      const hasErrors = this.validateModifiedFields(modifiedFields);
      if (hasErrors) {
      this.showErrorAlert = true;
        this.errorMessage = 'Por favor, corrige los errores en los campos modificados';
      return;
    }

    this.submitting = true;
    this.showErrorAlert = false;

      const chlorineUpdate: UpdateChlorine_records = modifiedFields;
      console.log('Datos a enviar en la actualización:', chlorineUpdate);

      this.qualityService.updateChlorine(this.chlorineId!, chlorineUpdate).subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: (error) => {
          console.error('Error en la actualización:', error);
          this.handleError('Error al actualizar el registro');
        }
      });
    } else {
      // En modo creación, validar todos los campos
      if (this.chlorineForm.invalid) {
        this.showErrorAlert = true;
        this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente';
        this.markAllFieldsAsTouched();
        return;
      }

      this.submitting = true;
      this.showErrorAlert = false;

      const chlorineCreate: createChlorine_records = this.chlorineForm.value;
      console.log('Datos a enviar en la creación:', chlorineCreate);

      this.qualityService.createChlorine(chlorineCreate).subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: (error) => {
          console.error('Error en la creación:', error);
          this.handleError('Error al crear el registro');
        }
      });
    }
  }

  private validateModifiedFields(modifiedFields: any): boolean {
    let hasErrors = false;
    Object.keys(modifiedFields).forEach(key => {
      const control = this.chlorineForm.get(key);
      if (control && control.invalid) {
        control.markAsTouched();
        hasErrors = true;
      }
    });
    return hasErrors;
  }

  private getModifiedFields(): any {
    const currentValue = this.chlorineForm.value;
    const modifiedFields: any = {};

    Object.keys(currentValue).forEach(key => {
      const currentFieldValue = currentValue[key];
      const originalFieldValue = this.originalFormValue[key];

      // Solo incluir el campo si su valor ha cambiado y no es null
      if (JSON.stringify(currentFieldValue) !== JSON.stringify(originalFieldValue) && currentFieldValue !== null) {
        modifiedFields[key] = currentFieldValue;
      }
    });

    console.log('Comparación de valores:');
    console.log('Valores actuales:', currentValue);
    console.log('Valores originales:', this.originalFormValue);
    console.log('Campos modificados finales:', modifiedFields);

    return modifiedFields;
  }

  private handleSuccess(): void {
    this.submitting = false;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.router.navigate(['/admin/qualitys']);
    }, 2000);
  }

  private handleError(message: string): void {
    this.submitting = false;
    this.showErrorAlert = true;
    this.errorMessage = message;
  }

  cancel(): void {
    this.router.navigate(['/admin/qualitys']);
  }
}
