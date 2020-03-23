import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
               provide: NG_VALIDATORS,
               useExisting: ConfirmPasswordValidatorService,
               multi: true
  }]
})
export class ConfirmPasswordValidatorService implements Validator {

  constructor() { }
}
