import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{

    static passwordMatching(control : AbstractControl): ValidationErrors | null {
        const password = control.get('merchantPassword')?.value;
        const passwordConfirm = control.get('merchantRePassword')?.value;

        if((password === passwordConfirm) && (password !== null && passwordConfirm !== null)){
            return null;
        }else{
            return {passwordsNotMatching:true};
        }
    }
}