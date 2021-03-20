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


  completedArray: Array<String>;

  incompletedArray: Array<Course>;
  ITMinorArray: Array<Course>; 

  constructor(private model: CompletedITService, private formBuilder: FormBuilder) {

    this.completedCoursesForm = this.formBuilder.group({
      completedCourse: ["", [Validators.required,
        Validators.pattern("^[0-9]*\.?[0-9]*$"),
        Validators.maxLength(4), 
        Validators.minLength(4)]],
    });

    this.ITMinorArray = this.model.getITMinor(); 
    console.log(this.ITMinorArray);
    
    this.completedArray = this.model.getCompleted();
  
    this.incompletedArray = this.model.getIncompleted(); 
   }


  ngOnInit() {}

  addCourse() {

    this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse); 
    this.completedCoursesForm.reset(); 

    
    console.log(this.completedArray);

    //https://www.tutorialspoint.com/typescript/typescript_string_localecompare.htm
    //link above is for comparing strings
  
  }

  addIncompeltedCourse(incompletedObject: Course ) {

    this.incompletedArray =  this.model.addIncompleted(incompletedObject);
    
  }

  
  check(){

    var completedLength = this.completedArray.length;
    var minorLength = this.ITMinorArray.length;

    console.log("Number of user completed courses: " + completedLength);
   

    for (let i = 0; i < minorLength; i++) {

      // const found = this.completedArray.find( ({ courseID }) => courseID === String(this.completedArray[i]));

      var found = this.completedArray.includes(this.ITMinorArray[i].courseID);

      console.log("found " + this.ITMinorArray[i].courseID+ " :" + found);

      if(!found){

        console.log("Course not completed: " + this.ITMinorArray[i].courseID);
        this.addIncompeltedCourse(this.ITMinorArray[i]);

      }

      var count = 0; 

      for (let i = 0; i < completedLength; i++) {

        var temp = this.completedArray[i];

        var firstVal = temp.charAt(0);

       

        if(firstVal === '3' || firstVal === '4'){
          console.log(temp);
          count++;
        }
      }

      if(count >= 3){
        console.log("User has completed 9 hours of 3000+ courses");
      }
      if(count === 2){
        console.log("User needs 1 more 3000+ course");

      }
      if(count === 1){
        console.log("user needs to complete 2 more 3000+ courses");
      }
      if(count === 0){
        console.log("User needs to complete 3 more 3000+ courses");
      }


  }

  console.log("final list of incompleted courses:");
  console.log(this.incompletedArray);

  }


  ionViewWillEnter(){
    this.model.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.model.getData("ITMinor").then((ITMinor)  => {
      if(ITMinor){
        this.ITMinorArray = ITMinor; 
      }
    }); 


  }



}
