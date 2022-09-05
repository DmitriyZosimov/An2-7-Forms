import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserModel } from './../../models/user.model';
import {CustomValidators} from "../../validators";


@Component({
  selector: 'app-signup-reactive-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css']
})
export class SignupReactiveFormComponent implements OnInit {

  rMin = 1;
  rMax = 3;

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
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        Validators.email
      ]
    ],
    phone: '',
    notification: 'email',
    serviceLevel: ['', CustomValidators.serviceLevelRange(this.rMin, this.rMax)],
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

  get email(): AbstractControl {
    return this.userForm.get('email')!;
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
    const phoneControl = this.phone;
    const emailControl = this.email;

    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
      this.placeholder.email = 'Email';
      this.placeholder.phone = 'Phone (required)';
    }
    else {
      emailControl.setValidators( [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        Validators.email
      ]);
      phoneControl.clearValidators();
      this.placeholder.email = 'Email (required)';
      this.placeholder.phone = 'Phone';
    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }


  private patchFormValues(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      // lastName: { value: this.user.lastName, disabled: false }
    });
  }


}
