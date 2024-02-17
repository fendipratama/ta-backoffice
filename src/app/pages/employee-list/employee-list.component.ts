import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router
    ) {}

    // variables
    public showForm = true;
    public showTable = true;
    public showDetail = false;
    public showEdit = false;
    public data: any;
    public formData = {
        firstName: '',
        lastName: '',
        email: ''
    };
    public formDetail = {
        userid: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        basicSalary: '',
        status: '',
        group: '',
        description: ''
    };
    public totalRow = 100;

    formatRupiah(number: any) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    formatAmount(amount: any) {
        let amountFormat = amount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return amountFormat;
    }

    substring(str: any) {
        return str.substring(0, 10);
    }

    onSubmit() {
        if (this.formData.firstName == '' && this.formData.lastName == '') {
            this.toastr.warning('First Name or Last Name is required!');
            return;
        }
        const requestBody = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };

        this.http
            .post<any>('http://localhost:3000/api/employee-search', requestBody)
            .subscribe((response) => {
                if (response['RESPONSE_CODE'] != '00') {
                    this.toastr.warning('Data not found!');
                } else {
                    this.data = [response['RESPONSE_DATA']['result']];
                }
            });
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        const requestBody = {
            total_data: this.totalRow,
            page: 1
        };

        this.http
            .post<any>('http://localhost:3000/api/employee-list', requestBody)
            .subscribe((response) => {
                this.data = response['RESPONSE_DATA']['result'];
            });
    }

    addEmployee() {
        // console.log('terpencet');
        this.router.navigate(['/employee-add']);
    }

    detailEmployee(value: any) {
        const requestBody = {
            userid: value
        };
        this.http
            .post<any>('http://localhost:3000/api/employee-detail', requestBody)
            .subscribe((response) => {
                if (response['RESPONSE_CODE'] == '00') {
                    this.showForm = false;
                    this.showTable = false;
                    this.showDetail = true;
                    this.showEdit = false;

                    const result = response['RESPONSE_DATA']['result'];
                    this.formDetail.userid = result.userid;
                    this.formDetail.username = result.username;
                    this.formDetail.firstName = result.firstName;
                    this.formDetail.lastName = result.lastName;
                    this.formDetail.email = result.email;
                    this.formDetail.birthDate = result.birthDate;
                    this.formDetail.basicSalary = result.basicSalary;
                    this.formDetail.status = result.status;
                    this.formDetail.group = result.group;
                    this.formDetail.description = result.description;
                } else {
                    this.toastr.warning('Data not found!');
                }
            });
    }

    btnBack() {
        this.showForm = true;
        this.showTable = true;
        this.showDetail = false;
        this.showEdit = false;

        this.formDetail.userid = '';
        this.formDetail.username = '';
        this.formDetail.firstName = '';
        this.formDetail.lastName = '';
        this.formDetail.email = '';
        this.formDetail.birthDate = '';
        this.formDetail.basicSalary = '';
        this.formDetail.status = '';
        this.formDetail.group = '';
        this.formDetail.description = '';
    }

    btnBack2() {
        this.showForm = true;
        this.showTable = true;
        this.showDetail = false;
        this.showEdit = false;

        this.formDetail.userid = '';
        this.formDetail.username = '';
        this.formDetail.firstName = '';
        this.formDetail.lastName = '';
        this.formDetail.email = '';
        this.formDetail.birthDate = '';
        this.formDetail.basicSalary = '';
        this.formDetail.status = '';
        this.formDetail.group = '';
        this.formDetail.description = '';
    }

    resetBtn() {
        this.formData.firstName = '';
        this.formData.lastName = '';
        this.formData.email = '';

        this.fetchData();
    }

    modalConfirmation(userid: any, username: string) {
        if (confirm('Are you sure to delete username:' + username + ' ?')) {
            const requestBody = {
                userid: userid
            };
            this.http
                .post<any>(
                    'http://localhost:3000/api/employee-delete',
                    requestBody
                )
                .subscribe((response) => {
                    if (response['RESPONSE_CODE'] == '00') {
                        this.toastr.success('Data has been deleted');
                    } else {
                        this.toastr.warning('Failed to delete data');
                    }
                    this.fetchData();
                });
        }
    }

    editEmployee(value: any) {
        this.showForm = false;
        this.showTable = false;
        this.showDetail = false;
        this.showEdit = true;

        const requestBody = {
            userid: value
        };
        this.http
            .post<any>('http://localhost:3000/api/employee-detail', requestBody)
            .subscribe((response) => {
                if (response['RESPONSE_CODE'] == '00') {
                    const result = response['RESPONSE_DATA']['result'];
                    this.formDetail.userid = result.userid;
                    this.formDetail.username = result.username;
                    this.formDetail.firstName = result.firstName;
                    this.formDetail.lastName = result.lastName;
                    this.formDetail.email = result.email;
                    this.formDetail.birthDate = result.birthDate;
                    this.formDetail.basicSalary = result.basicSalary;
                    this.formDetail.status = result.status;
                    this.formDetail.group = result.group;
                    this.formDetail.description = result.description;
                } else {
                    this.toastr.warning('Data not found!');
                }
            });
    }

    onEdit() {
        const requestBodyEdit = {
            userid: this.formDetail.userid,
            username: this.formDetail.username,
            firstName: this.formDetail.firstName,
            lastName: this.formDetail.lastName,
            email: this.formDetail.email,
            birthDate: this.formDetail.birthDate,
            basicSalary: this.formDetail.basicSalary,
            status: this.formDetail.status,
            group: this.formDetail.group
        };

        this.http
            .post<any>(
                'http://localhost:3000/api/employee-edit',
                requestBodyEdit
            )
            .subscribe((response) => {
                if (response['RESPONSE_CODE'] == '00') {
                    this.toastr.success('Data has been updated!');
                } else {
                    this.toastr.warning('Failed to update date!');
                }
                this.btnBack2();
            });
    }
}
