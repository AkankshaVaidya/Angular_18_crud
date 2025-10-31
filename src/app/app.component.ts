import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeClass } from '../Model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj:EmployeeClass = new EmployeeClass();

  constructor(){
    this.createForm();
  }

  createForm(){
    this.employeeForm=new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pincode: new FormControl(this.employeeObj.pincode),
      state: new FormControl(this.employeeObj.state),
    })
  }

}
