import { FormControl } from '@angular/forms';

export function emailDomainValidator(control: FormControl): any {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
        const [_, domain] = email.split('@');
        if (domain !== 'alunos.utfpr.edu.br') {
            return {
                emailDomain: {
                    parsedDomain: domain
                }
            }
        }
    }
    return null;
}
