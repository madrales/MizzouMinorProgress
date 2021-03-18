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
      completedCourse: ["", [Validators.required,
        Validators.pattern("^[0-9]*\.?[0-9]*$"),
        Validators.maxLength(4), 
        Validators.minLength(4)]],
    });

    //this.data = model.getData(); 
    
    this.completedArray = this.model.getCompleted();
   }


  ngOnInit() {}

  addCourse() {

    this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse); 
    this.completedCoursesForm.reset(); 

    
    console.log(this.completedArray[0]);

    //https://www.tutorialspoint.com/typescript/typescript_string_localecompare.htm
    //link above is for comparing strings


    const random = this.model.getCompletedIndex();
    console.log("random");
    console.log(random);

  }

  
  check(){

    if(String(this.data[0].courseID) === String(this.completedArray[0].courseID)){
      console.log("hi");
    }
    else{
      console.log("failed");
    }
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
