import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { Client, ClientCreate, ClientUpdate, Role, Status } from '../../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId: string | null = null;
  loading = false;
  submitting = false;
  showSuccessAlert = false;
  showErrorAlert = false;

  // Opciones para selects
  documentTypes = ['DNI', 'CNE'];
  statuses = Object.values(Status);
  boxTypes = ['Caño', 'Conexión Domiciliaria', 'Pilón Público'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.clientId = params['id'];
        this.loadClient();
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      branchOfficeId: ['', Validators.required],
      documentType: ['DNI', Validators.required],
      documentNumber: ['', [Validators.required, this.documentNumberValidator.bind(this)]],
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      address: this.fb.group({
        detail: [''],
        localityName: ['', Validators.required],
        streetName: ['', Validators.required]
      }),
      role: [Role.CLIENT, Validators.required],
      status: [Status.ACTIVE, Validators.required],
      waterBoxes: this.fb.array([])
    });
  }

  nameValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(value)) {
      return { 'invalidName': 'Solo se permiten letras y espacios' };
    }
    return null;
  }

  documentNumberValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    const documentType = this.clientForm?.get('documentType')?.value;

    if (!value) return null;

    if (documentType === 'DNI') {
      // DNI: exactamente 8 dígitos numéricos
      const dniRegex = /^\d{8}$/;
      if (!dniRegex.test(value)) {
        return { 'invalidDocument': 'El DNI debe tener 8 dígitos numéricos' };
      }
    } else if (documentType === 'CNE') {
      // CNE: exactamente 20 caracteres
      if (value.length !== 20) {
        return { 'invalidDocument': 'El CNE debe tener exactamente 20 caracteres' };
      }
    }

    return null;
  }

  phoneValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    // Debe comenzar con 9 y tener exactamente 9 dígitos
    const phoneRegex = /^9\d{8}$/;
    if (!phoneRegex.test(value)) {
      return { 'invalidPhone': 'El teléfono debe comenzar con 9 y tener 9 dígitos' };
    }
    return null;
  }

  emailValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    // Validación básica de email (ya tenemos Validators.email)
    // Podemos añadir validación adicional si es necesario
    return null;
  }

  get waterBoxesArray(): FormArray {
    return this.clientForm.get('waterBoxes') as FormArray;
  }

  private createWaterBoxGroup(waterBox?: any): FormGroup {
    return this.fb.group({
      boxId: [waterBox?.boxId || '', Validators.required],
      code: [waterBox?.code || '', Validators.required],
      type: [waterBox?.type || 'Caño', Validators.required]
    });
  }

  addWaterBox(): void {
    this.waterBoxesArray.push(this.createWaterBoxGroup());
  }

  removeWaterBox(index: number): void {
    this.waterBoxesArray.removeAt(index);
  }

  // Métodos para manejar input en tiempo real
  onDocumentTypeChange(): void {
    const documentNumberControl = this.clientForm.get('documentNumber');
    documentNumberControl?.setValue('');
    documentNumberControl?.updateValueAndValidity();
  }

  onDocumentNumberInput(event: any): void {
    const value = event.target.value;
    const documentType = this.clientForm.get('documentType')?.value;

    // Permitir solo números para DNI, cualquier carácter para CNE
    if (documentType === 'DNI') {
      // Solo números
      const numericValue = value.replace(/[^0-9]/g, '');
      event.target.value = numericValue.slice(0, 8); // Limitar a 8 caracteres
    } else if (documentType === 'CNE') {
      // Limitar a 20 caracteres
      event.target.value = value.slice(0, 20);
    }
  }

  onNameInput(event: any, fieldName: string): void {
    const value = event.target.value;
    // Eliminar números y símbolos, permitir letras, espacios y caracteres especiales del español
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.clientForm.get(fieldName)?.setValue(cleanValue);
  }

  onPhoneInput(event: any): void {
    const value = event.target.value;
    // Solo números y limitar a 9 caracteres
    const numericValue = value.replace(/[^0-9]/g, '');
    event.target.value = numericValue.slice(0, 9);
  }

  // Métodos para validación y errores
  isFieldInvalid(field: string): boolean {
    const control = this.clientForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  isNestedFieldInvalid(group: string, field: string): boolean {
    const control = this.clientForm.get(group)?.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getFieldError(field: string): string {
    const control = this.clientForm.get(field);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) {
      return 'Este campo es requerido';
    } else if (control.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    } else if (control.hasError('invalidName')) {
      return control.getError('invalidName');
    } else if (control.hasError('invalidDocument')) {
      return control.getError('invalidDocument');
    } else if (control.hasError('invalidPhone')) {
      return control.getError('invalidPhone');
    }

    return '';
  }

  getDocumentPlaceholder(): string {
    return this.clientForm.get('documentType')?.value === 'DNI' ? '87654321' : 'CNE-12345678901234567890';
  }

  getDocumentMaxLength(): number {
    return this.clientForm.get('documentType')?.value === 'DNI' ? 8 : 20;
  }

  private loadClient(): void {
    this.loading = true;
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe({
        next: (client) => {
          this.populateForm(client);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          // Manejar error
        }
      });
    }
  }

  private populateForm(client: Client): void {
    this.clientForm.patchValue({
      branchOfficeId: client.branchOfficeId,
      documentType: client.documentType,
      documentNumber: client.documentNumber,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      email: client.email,
      role: client.role,
      status: client.status,
      address: {
        detail: client.address.detail,
        localityName: client.address.localityName,
        streetName: client.address.streetName
      }
    });

    // Limpiar y agregar cajas de agua
    this.waterBoxesArray.clear();
    client.waterBoxes.forEach(box => {
      this.waterBoxesArray.push(this.createWaterBoxGroup(box));
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.showErrorAlert = true;
      this.markAllFieldsAsTouched();
      return;
    }

    this.submitting = true;
    this.showErrorAlert = false;

    const formValue = this.clientForm.value;

    if (this.isEditMode && this.clientId) {
      // Modo edición
      const clientUpdate: ClientUpdate = {
        ...formValue,
        id: this.clientId
      };

      this.clientService.updateClient(this.clientId, clientUpdate).subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: () => {
          this.handleError();
        }
      });
    } else {
      // Modo creación
      const clientCreate: ClientCreate = formValue;

      this.clientService.createClient(clientCreate).subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: () => {
          this.handleError();
        }
      });
    }
  }

  private handleSuccess(): void {
    this.submitting = false;
    this.showSuccessAlert = true;

    // Ocultar alerta después de 3 segundos
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.cancel();
    }, 3000);
  }

  private handleError(): void {
    this.submitting = false;
    this.showErrorAlert = true;
  }

  private markAllFieldsAsTouched(): void {
    Object.values(this.clientForm.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(nestedControl => {
          nestedControl.markAsTouched();
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/clients']);
  }
}