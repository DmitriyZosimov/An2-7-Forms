import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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

  static serviceLevelRange(min: number, max: number): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      if (value !== undefined && (Number.isNaN(value) || value < min || value > max)) {
        return {
          serviceLevel: true
        };
      }
      return null;
    }
  }

}
