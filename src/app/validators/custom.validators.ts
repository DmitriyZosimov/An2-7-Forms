import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkServiceLevel(
  value: number,
  min: number = 1,
  max: number = 5
): ValidationErrors | null {
  if (
    value !== undefined &&
    (Number.isNaN(value) || value < min || value > max)
  ) {
    return {
      serviceLevel: true
    };
  }
  return null;
}

export class CustomValidators {
  static serviceLevel({value}: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(value);
  }

  static serviceLevelRange(min: number, max: number): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      return checkServiceLevel(value, min, max);
    }
  }

}
