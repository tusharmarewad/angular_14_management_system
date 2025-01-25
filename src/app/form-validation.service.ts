import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  validateField(field: any, value: any): string {
    if (field.validations.required && (!value || value === '')) {
      return `${field.label} is required.`;
    }
    return ''; // No error
  }

  validateForm(fields: any[], formData: { [key: string]: any }): boolean {
    let isFormValid = true;

    fields.forEach((field) => {
      const error = this.validateField(field, formData[field.id]);
      field.error = error;
      if (error) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }
}
