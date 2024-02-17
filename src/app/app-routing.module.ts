import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {EmployeeListComponent} from '@pages/employee-list/employee-list.component';
import {EmployeeAddComponent} from '@pages/employee-add/employee-add.component';
import {EmployeeDetailComponent} from '@pages/employee-detail/employee-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'employee-list',
                component: EmployeeListComponent
            },
            {
                path: 'employee-add',
                component: EmployeeAddComponent
            },
            {
                path: 'employee-detail',
                component: EmployeeDetailComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
