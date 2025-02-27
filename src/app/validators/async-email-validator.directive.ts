import {Directive} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

import {Observable} from 'rxjs';
import {CustomValidators} from './custom.validators';
import {debounceTime, distinctUntilChanged, first} from "rxjs/operators";

@Directive({
  selector: '[appAsyncEmailValidator][formControlName], [appAsyncEmailValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncEmailValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncEmailValidatorDirective implements Validator {
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // return CustomValidators.asyncEmailPromiseValidator(c);
    return this.validateEmailObservable(c.value)
     .pipe(
       debounceTime(1000),
       distinctUntilChanged(),
// The observable returned must be finite, meaning it must complete at some point.
// To convert an infinite observable into a finite one, pipe the observable through a
// filtering operator such as first, last, take, or takeUntil
       first()
     );
  }

  private validateEmailObservable(email: string): Observable<ValidationErrors | null> {
    return new Observable(observer => {
      if (email === 'existsemail@example.com') {
        observer.next({asyncEmailInvalid: true});
      } else {
        observer.next(null);
      }
    });
  }
}
