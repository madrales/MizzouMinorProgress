import { Component, OnInit } from '@angular/core';

//importing course object interface
import { Course } from 'src/app/interfaces/course';
import { Completed } from 'src/app/interfaces/completed';

//importing service for completed IT courses
import { CompletedITService } from 'src/app/services/completed-it.service'; 

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.page.html',
  styleUrls: ['./all-courses.page.scss'],

})
export class AllCoursesPage implements OnInit {
  private completedCoursesForm: FormGroup;

  // completedArray = [];
  
  completedArray: Array<Completed>;

  data: Array<Course>; 

  constructor(private model: CompletedITService, private formBuilder: FormBuilder) {

    this.completedCoursesForm = this.formBuilder.group({
      completedCourse: ["", Validators.required],
      done: false
    });

    // this.data = model.getData(); 
    
    this.completedArray = this.model.getCompleted();
   }

 

  // checkReaining(){

  //   if(this.data[0].courseID == this.completedArray[0].courseID){
  //     console.log("hi");
  //   }
  //   else{
  //     console.log("failed");
  //   }


  ngOnInit() {}

  addCourse() {

    this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value); 
    this.completedCoursesForm.reset(); 
    console.log(this.completedArray[0]);
    console.log(this.completedArray[0].courseID);

  }

  ionViewWillEnter(){
    this.model.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.model.getData("current").then((completed)  => {
      if(completed){
        this.completedArray = completed; 
      }
    }); 
  }


}
