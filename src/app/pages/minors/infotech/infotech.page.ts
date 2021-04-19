import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { CompletedITService } from 'src/app/services/completed-it.service'; 

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ComponentModule } from '../../../components/component/component.module';
@NgModule({
  declarations: [
  ],
  imports: [
    ComponentModule
  ],
  exports: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
@Component({
  selector: 'app-infotech',
  templateUrl: './infotech.page.html',
  styleUrls: ['./infotech.page.scss'],
})
export class InfotechPage implements OnInit {
  private completedCoursesForm: FormGroup;
  public test: String;
  public status: String;

  completedArray: Array<String>;

  incompletedArray: Array<Course>;
  ITMinorArray: Array<Course>;
  ITMinorArray2: Array<Course>;

  constructor(private model: CompletedITService, private formBuilder: FormBuilder) {
    this.completedCoursesForm = this.formBuilder.group({
      completedCourse: ["", [Validators.required,]],
    });

    //Sequnece 1
    this.ITMinorArray = this.model.getITMinor(); 
    console.log("Sequence 1" + this.ITMinorArray);

    //Sequence 2
    this.ITMinorArray2 = this.model.getITMinor2();
    console.log("Sequence 2" + this.ITMinorArray2);
    
    //Courses compeleted by User
    this.completedArray = this.model.getCompleted();
  
    //Courses remaining to be completed
    this.incompletedArray = this.model.getIncompleted();

   }

  ngOnInit() {}

  addCourse() {

    
    var submittedLenght = this.completedCoursesForm.value.completedCourse.length;

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse[i]);

    }


    // this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse); 
    // this.completedCoursesForm.reset(); 

    
    console.log(this.completedArray);
  
  }

  addIncompeltedCourse(incompletedObject: Course ) {

    this.incompletedArray =  this.model.addIncompleted(incompletedObject);
    
  }

  
  check(){

    this.incompletedArray = this.model.clearIncomplete();

    var completedLength = this.completedArray.length;
    var minorLength = this.ITMinorArray.length;

    console.log("Number of user completed courses: " + completedLength);
   

    for (let i = 0; i < minorLength; i++) {


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
        this.test = "You have completed 9 hours of 3000+ courses.";

        console.log("You have completed 9 hours of 3000+ courses");
      }
      if(count === 2){
        this.test = "You need to complete 1 more 3000+ courses";
        console.log("You need 1 more 3000+ course");

      }
      if(count === 1){
        this.test = "You need to complete 2 more 3000+ courses";
        console.log("You need to complete 2 more 3000+ courses");
      }
      if(count === 0){
        this.test = "You need to complete 3 more 3000+ courses";
        console.log("You need to complete 3 more 3000+ courses");
      }
      if(this.incompletedArray.length == 0 && count == 3){
        this.status = "You have completed the IT minor!"
      }else {
        this.status = "You have not completed the IT minor."
      }


  }

  console.log("final list of incompleted courses:");
  console.log(this.incompletedArray);

  }

  clear(){
    this.completedArray  = this.model.clearCompleted();
    this.incompletedArray = this.model.clearIncomplete();
    this.status = "";
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
