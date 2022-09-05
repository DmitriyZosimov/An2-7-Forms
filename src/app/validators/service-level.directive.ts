import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

import {checkServiceLevel} from './custom.validators';

@Directive({
  selector: '[appServiceLevelValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ServiceLevelDirective,
    multi: true
  }]
})
export class ServiceLevelDirective implements Validator {

  @Input() rMin = 1;
  @Input() rMax = 3;

  validate(c: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(c.value, this.rMin, this.rMax);
  }
}
