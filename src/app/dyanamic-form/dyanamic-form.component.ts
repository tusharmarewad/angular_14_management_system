import { Component } from '@angular/core';

export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string; // Mandatory
  options?: string[];
  validations: {
    required: boolean;
  };
  error?: string;
}


@Component({
  selector: 'app-dyanamic-form',
  templateUrl: './dyanamic-form.component.html',
  styleUrls: ['./dyanamic-form.component.css'],
})
export class DyanamicFormComponent {
  formFields: FormField[] = [];
  formData: { [key: string]: any } = {};
  newField: FormField = {
    id: '',
    type: 'text',
    label: '',
    placeholder: '', // Initialize as an empty string
    options: [],
    validations: {
      required: true,
    },
    error: '',
  };
  
  optionsInput = '';

  constructor() {}

  addField() {
    if (!this.newField.label.trim()) {
      alert('Label is required for a field!');
      return;
    }
  
    // Only validate placeholder for 'text' or 'textarea' field types
    if (
      (this.newField.type === 'text' || this.newField.type === 'textarea') &&
      (!this.newField.placeholder || !this.newField.placeholder.trim())
    ) {
      alert('Placeholder is required for a text or textarea field!');
      return;
    }
  
    // Assign a unique ID to the field
    this.newField.id = Date.now().toString();
  
    // Process options for dropdown or radio button fields
    if (this.optionsInput) {
      this.newField.options = this.optionsInput.split(',').map((opt) => opt.trim());
    }
  
    // Add the new field to the formFields array
    this.formFields.push({ ...this.newField });
  
    // Reset the newField object
    this.resetNewField();
  }
  

  resetNewField() {
    this.newField = {
      id: '',
      type: 'text',
      label: '',
      placeholder: '',
      options: [],
      validations: { required: false },
      error: '',
    };
    this.optionsInput = '';
  }

  onSubmit(previewForm: any) {
    if (previewForm.valid) {
      // Construct an object with label names and their corresponding values
      const submittedData = this.formFields.map((field) => ({
        label: field.label,
        value: this.formData[field.id] || '',
      }));
  
      console.log('Form Submitted Successfully:', submittedData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  }
  
  
  
  

  removeField(fieldId: string) {
    this.formFields = this.formFields.filter((field) => field.id !== fieldId);
    delete this.formData[fieldId];
  }
}
