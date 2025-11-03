import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from '../Model/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();

  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("Empdata")
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name ,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pincode: new FormControl(this.employeeObj.pincode,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state),
    })
  }
  reset(){
     this.employeeObj=new EmployeeModel();
      this.createForm();
  }
  onSave() {
    const oldData = localStorage.getItem("Empdata")
    if (oldData != null) {
      debugger
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value)
      console.log(this.employeeList);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value)
      
    }
    localStorage.setItem("Empdata",JSON.stringify(this.employeeList))
      this.reset();
  }

  onEdit(item:EmployeeModel){
    debugger
   this.employeeObj = item;
   this.createForm();
  }

  onUpdate(){
    const record = this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value);     
    if(record!=undefined){
      record.name=this.employeeForm.controls['name'].value;
      record.emailId=this.employeeForm.controls['emailId'].value;
      record.contactNo=this.employeeForm.controls['contactNo'].value;
    } 
    
      localStorage.setItem("Empdata",JSON.stringify(this.employeeList))
      this.reset();
  }

  OnDelete(id: Number){
    const isDelete= confirm("Are you sure to delete this record?");
    if(isDelete){
      const index= this.employeeList.findIndex(m=>m.empId == id)
      this.employeeList.splice(index,1);

    }
    localStorage.setItem("Empdata",JSON.stringify(this.employeeList))
  }


}
