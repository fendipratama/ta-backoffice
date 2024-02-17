import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

// import {HammerModule} from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {IGX_DATE_PICKER_DIRECTIVES} from 'igniteui-angular';

@Component({
    selector: 'app-employee-add',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule
        // BrowserAnimationsModule,
        // HammerModule,
        // IGX_DATE_PICKER_DIRECTIVES
    ],
    templateUrl: './employee-add.component.html',
    styleUrl: './employee-add.component.scss'
    // template: `
    //     <igx-date-picker>
    //         <label igxLabel>Date</label>
    //     </igx-date-picker>
    // `
})
export class EmployeeAddComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router
    ) {}

    // variables
    public formData = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        basicSalary: '',
        status: '',
        group: ''
    };

    ngOnInit() {}

    btnBack() {
        this.router.navigate(['/employee-list']);
    }

    onSubmit() {
        if (this.formData.username == '') {
            this.toastr.warning('username is required!');
            return;
        }
        if (this.formData.firstName == '') {
            this.toastr.warning('firstname is required!');
            return;
        }
        if (this.formData.lastName == '') {
            this.toastr.warning('lastname is required!');
            return;
        }
        if (this.formData.email == '') {
            this.toastr.warning('email is required!');
            return;
        } else {
            if (!this.formData.email.includes('@')) {
                this.toastr.warning('invalid email!');
                return;
            }
        }
        if (this.formData.birthDate == '') {
            this.toastr.warning('birthdate is required!');
            return;
        }
        if (this.formData.basicSalary == '') {
            this.toastr.warning('basic salary is required!');
            return;
        }
        if (this.formData.status == '') {
            this.toastr.warning('status salary is required!');
            return;
        }
        if (this.formData.group == '') {
            this.toastr.warning('group salary is required!');
            return;
        }

        const requestBody = {
            username: this.formData.username,
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            birthDate: this.formData.birthDate,
            basicSalary: this.formData.basicSalary,
            status: this.formData.status,
            group: this.formData.group
        };
        this.http
            .post<any>('http://localhost:3000/api/employee-add', requestBody)
            .subscribe((response) => {
                if (response['RESPONSE_CODE'] == '00') {
                    this.toastr.success('Data has been saved!');
                } else {
                    this.toastr.warning('Failed to save data!');
                }
                this.formData.username = '';
                this.formData.firstName = '';
                this.formData.lastName = '';
                this.formData.email = '';
                this.formData.birthDate = '';
                this.formData.basicSalary = '';
                this.formData.status = '';
                this.formData.group = '';

                this.router.navigate(['/employee-list']);
            });
    }
}
