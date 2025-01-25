import { Component } from '@angular/core';

export interface CheckboxOption {
  name: string;
  selected: boolean;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string; // Mandatory for text and textarea
  options?: string[];
  checkboxOptions?: CheckboxOption[]; // Specific for checkbox
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
    validations: {
      required: true,
    },
  };

  optionsInput = '';
  checkboxOptionsInput = '';

  constructor() {}

  addField() {
    if (!this.newField.label.trim()) {
      alert('Label is required for a field!');
      return;
    }

    this.newField.id = Date.now().toString();

    // If it's a checkbox field, prepare checkboxOptions
    if (this.newField.type === 'checkbox' && this.checkboxOptionsInput) {
      this.newField.checkboxOptions = this.checkboxOptionsInput
        .split(',')
        .map((opt) => ({ name: opt.trim(), selected: false }));
    } else if (
      (this.newField.type === 'dropdown' || this.newField.type === 'radio') &&
      this.optionsInput
    ) {
      // Handle dropdown and radio options
      this.newField.options = this.optionsInput.split(',').map((opt) => opt.trim());
    }

    this.formFields.push({ ...this.newField });
    this.resetNewField();
  }

  resetNewField() {
    this.newField = {
      id: '',
      type: 'text',
      label: '',
      validations: { required: true },
    };
    this.optionsInput = '';
    this.checkboxOptionsInput = '';
  }

  removeField(fieldId: string) {
    this.formFields = this.formFields.filter((field) => field.id !== fieldId);
    delete this.formData[fieldId];
  }

  updateCheckboxSelection(fieldId: string, optionName: string) {
    const field = this.formFields.find((f) => f.id === fieldId);
    if (field?.checkboxOptions) {
      const option = field.checkboxOptions.find((opt) => opt.name === optionName);
      if (option) {
        option.selected = !option.selected;
        console.log(`Updated Checkbox State for ${field.label}:`, field.checkboxOptions);
      }
    }
  }

  onSubmit(previewForm: any) {
    if (previewForm.valid) {
      const submittedData = this.formFields.map((field) => {
        if (field.type === 'checkbox') {
          return {
            label: field.label,
            value: field.checkboxOptions,
          };
        } else {
          return {
            label: field.label,
            value: this.formData[field.id] || '',
          };
        }
      });

      console.log('Form Submitted Successfully:', submittedData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
