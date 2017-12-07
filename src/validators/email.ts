import { FormControl } from '@angular/forms';

export class EmailValidator {

  static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9_\-\.]{1,50})@([a-zA-Z0-9_\-\.]{1,10})\.([a-zA-Z]{2,4})$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };

  }
}