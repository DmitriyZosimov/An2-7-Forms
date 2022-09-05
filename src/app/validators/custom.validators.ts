import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static serviceLevel({value}: AbstractControl): ValidationErrors | null {
    console.log('Validator: serviceLevel is called');
    if (value !== undefined && (Number.isNaN(value) || value < 1 || value > 5)) {
      return {
        serviceLevel: true
      };
    }
    return null;
  }
}
