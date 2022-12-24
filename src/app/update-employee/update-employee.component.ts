import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{

  id!: number;
  employee:Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute:ActivatedRoute){ }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      console.log(data)
       this.employee = data;
    },error => console.log(error));
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.id,this.employee).subscribe({
      next: () => this.goToEmployeeList(),
      error: (e) => console.error(e),
      complete: () => console.log('complete')
    });
  }
  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
  onSubmit(){
    this.updateEmployee();
  }


}
