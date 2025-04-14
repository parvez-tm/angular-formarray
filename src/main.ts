import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

interface ITodo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

@Component({
  selector: 'app-root',
  // template: `
  //   <h1>Hello from PTM!</h1>
  // `,
  templateUrl: 'form.html',
  imports: [CommonModule,ReactiveFormsModule]
})
export class App {
  
  form: FormArray = this.fb.array([]);
  data: ITodo[] = []; 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ){
  }

  // Type-safe getter for form controls
  // get f(): AbstractControl[] {
  //   return this.form.controls;
  // }

  get f(): FormGroup[] {
    return (this.form.controls as FormGroup[]);
  }

  ngOnInit(){
    this.getData()
  }
  getData(){
    this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos').subscribe({
      next: (data)=>{
        // this.data = data
        this.data = data.slice(0, 10);
        this.buildForm(this.data)
      }
    })
  }

  buildForm(data:ITodo[]){
    const group = data.map(item => 
      this.fb.group({
        completed : [item.completed]
      })
    )
    this.form = this.fb.array(group)
    
  }

}

bootstrapApplication(App,
  {
    providers: [
      provideHttpClient()
    ]
  }
);
