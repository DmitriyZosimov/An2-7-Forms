import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators, AbstractControlOptions} from '@angular/forms';
import { UserModel } from './../../models/user.model';
import {CustomValidators} from "../../validators";


@Component({
  selector: 'app-signup-reactive-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css']
})
export class SignupReactiveFormComponent implements OnInit {

  rMin = 1;
  rMax = 4;

  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
// data model
  user: UserModel = new UserModel(
    'Vitaliy',
    'Zhyrytskyy',
    'v.zhiritskiy@gmail.com',
    false
  );

  placeholder = {
    email: 'Email (required)',
    confirmEmail: 'Confirm Email (required)',
    phone: 'Phone'
  };

  // // form model
  // userForm = new FormGroup({
  //   firstName: new FormControl('', {
  //     validators: [Validators.required, Validators.minLength(3)],
  //     updateOn: 'blur',
  //     nonNullable: true
  //   }),
  //
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   phone: new FormControl(),
  //   notification: new FormControl('email'),
  //   serviceLevel: new FormControl('', {
  //     validators: [CustomValidators.serviceLevel],
  //     updateOn: 'blur'
  //   }),
  //   sendProducts: new FormControl(true)
  // });

  userForm = this.fb.group({
    // firstName: ['', [Validators.required, Validators.minLength(3)]],
  // It works!
  firstName: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'}),
  // It works since v7
  // firstName: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }),

  lastName: [
      { value: 'Zhyrytskyy', disabled: false },
      [Validators.required, Validators.maxLength(50)]
    ],
    emailGroup: this.fb.group({
      email: ['',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.email],
        // [CustomValidators.asyncEmailPromiseValidator]
      ],
      confirmEmail: ['', Validators.required],
    }, {validator: CustomValidators.emailMatcher} as AbstractControlOptions),

    phone: '',
    notification: 'email',
    serviceLevel: [''],
    sendProducts: true
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.setFormValues();
    // this.patchFormValues();

  }

  onReset(): void {
    this.userForm.reset();
  }

  onSave(): void {
    // Form model
    console.log(this.userForm);
    // Form value w/o disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    // Form value w/ disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
  }

  get firstName(): AbstractControl {
    return this.userForm.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastName')!;
  }

  get emailGroup(): AbstractControl {
    return this.userForm.get('emailGroup')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('emailGroup.email')!;
  }

  get confirmEmail(): AbstractControl {
    return this.userForm.get('emailGroup.confirmEmail')!;
  }

  get phone(): AbstractControl {
    return this.userForm.get('phone')!;
  }

  get serviceLevel(): AbstractControl {
    return this.userForm.get('serviceLevel')!;
  }


  // private setFormValues(): void {
  //   this.userForm.setValue({
  //     firstName: this.user.firstName,
  //     lastName: { value: this.user.lastName, disabled: false },
  //     email: this.user.email,
  //     sendProducts: this.user.sendProducts
  //   });
  // }

  onSetNotification(notifyVia: string): void {
    const controls = new Map();
    controls.set('phoneControl', this.phone);
    controls.set('emailGroup', this.emailGroup);
    controls.set('emailControl', this.email);
    controls.set('confirmEmailControl', this.confirmEmail);

    if (notifyVia === 'text') {
      controls.get('phoneControl').setValidators(Validators.required);
      controls.forEach(
        (control, index) => {
          if (index !== 'phoneControl') {
            control.clearValidators();
            control.clearAsyncValidators();
          }
        }
      );

      this.placeholder = {
        phone: 'Phone (required)',
        email: 'Email',
        confirmEmail: 'Confirm Email'
      };
    } else {
      const emailControl = controls.get('emailControl');
      emailControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        Validators.email
      ]);
      emailControl.setAsyncValidators(CustomValidators.asyncEmailPromiseValidator);
      controls.get('confirmEmailControl').setValidators([Validators.required]);
      controls.get('emailGroup').setValidators([CustomValidators.emailMatcher]);
      controls.get('phoneControl').clearValidators();

      this.placeholder = {
        phone: 'Phone',
        email: 'Email (required)',
        confirmEmail: 'Confirm Email (required)'
      };
    }
    controls.forEach(control => control.updateValueAndValidity());
  }



  private patchFormValues(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      // lastName: { value: this.user.lastName, disabled: false }
    });
  }


}
