import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { WebDevCertificateService } from 'src/app/services/WebDevCertificate/web-dev-certificate.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-mobilecert',
  templateUrl: './mobilecert.page.html',
  styleUrls: ['./mobilecert.page.scss'],
})
export class MobilecertPage implements OnInit {

  private completedCoursesForm: FormGroup;
  public test: String;
  public status: String; 
  public showElectives: Boolean = false; 
  public count = 0;
  public left = 2; 


  completedArray: Array<String>; 
  incompletedArray: Array<Course>;
  incompletedElectiveArray: Array<Course>;

  WebDevCoreArray: Array<Course>; 
  WebDevElectiveArray: Array<Course>; 

  constructor(
    private model: WebDevCertificateService, 
    private formBuilder: FormBuilder) {

      this.completedCoursesForm = this.formBuilder.group({
        completedCourse:["", [Validators.required],]
      });
  
      this.WebDevCoreArray = this.model.getWebDevCore(); 
      console.log("Core courses" + this.WebDevCoreArray);
  
      this.WebDevElectiveArray = this.model.getWebDevElective(); 
      console.log("Elective courses" + this.WebDevElectiveArray);
      
      this.completedArray = this.model.getCompleted();
    
      this.incompletedArray = this.model.getIncompleted(); 
      console.log("incompleted core" + this.incompletedArray);
  
      this.incompletedElectiveArray = this.model.getIncompletedElectives();
      console.log("incompleted elective" + this.incompletedElectiveArray);
  
     }

  ngOnInit() {}

  addCourse() {

    var submittedLenght = this.completedCoursesForm.value.completedCourse.length;

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse[i]);

    }

    console.log("initial submitted courses: " + this.completedArray);
    console.log("initial submitted number courses: " + this.completedArray.length);
    console.log (typeof this.completedArray);
    console.log(typeof String(this.completedArray[0]));
  }

  addIncompeltedCourse(incompletedObject: Course ) {
    this.incompletedArray =  this.model.addIncompleted(incompletedObject);   
  }

  addIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.incompletedElectiveArray =  this.model.addIncompletedElective(incompletedObject);   
  }

  clear(){

    this.completedArray  = this.model.clearCompleted();
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;
    this.status = "";
    console.log("Cleared!"); 
  }

  ionViewWillEnter(){
    this.model.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.model.getData("WebDevCore").then((WebDevCore)  => {
      if(WebDevCore){
        this.WebDevCoreArray = WebDevCore; 
      }
    }); 

    this.model.getData("WebDevElective").then((WebDevElective)  => {
      if(WebDevElective){
        this.WebDevElectiveArray = WebDevElective; 
      }
    }); 
  }

  check(){

    this.left = 2; 
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.WebDevCoreArray.length;
    var electivesLength = this.WebDevElectiveArray.length; 

    console.log("Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    var found = this.completedArray.includes( this.WebDevCoreArray[0].courseID);
    console.log("found " + this.WebDevCoreArray[0].courseID+ " :" + found);


        if(!found){
        console.log("Course not completed: " + this.WebDevCoreArray[0].courseID);
        this.addIncompeltedCourse(this.WebDevCoreArray[0]);
      }

      var found1 = this.completedArray.includes( this.WebDevCoreArray[1].courseID);
      var found2 = this.completedArray.includes(this.WebDevCoreArray[2].courseID); 
      console.log("found " + this.WebDevCoreArray[1].courseID+ " :" + found);
      console.log("found " + this.WebDevCoreArray[2].courseID+ " :" + found);

        if(!found1 && !found2){

          console.log("Courses not completed: " + this.WebDevCoreArray[1].courseID);
          console.log(" and "  + this.WebDevCoreArray[2].courseID);
          this.addIncompeltedCourse(this.WebDevCoreArray[1]);
          this.addIncompeltedCourse(this.WebDevCoreArray[2]);

          
        }


    // for (let i = 0; i < certificateLength; i++) {
     
    //   var found = this.completedArray.includes( this.WebDevCoreArray[i].courseID);

    //   console.log("found " + this.WebDevCoreArray[i].courseID+ " :" + found);

    //   if(!found){

    //     console.log("Course not completed: " + this.WebDevCoreArray[i].courseID);
    //     this.addIncompeltedCourse(this.WebDevCoreArray[i]);

    //   }

      this.count = 0;
      console.log("Electives lenght: " + electivesLength);
      console.log("count :" + this.count);
      for (let i = 0; i < electivesLength; i++) {
        

        var found = this.completedArray.includes(this.WebDevElectiveArray[i].courseID);
  
        console.log("found " + this.WebDevElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          this.count++;
          continue;
        }

        if(!found){
          this.addIncompeltedElectiveCourse(this.WebDevElectiveArray[i]);
          console.log("added to incomplete electives : " + this.WebDevElectiveArray[i]);
         continue; 
        }
     }

     if(this.count == 0 ){
       this.left =2; 
      this.showElectives = true;
       console.log("user still needs to complete elective courses");
       console.log(this.showElectives);
     }
     if(this.count == 1){
      this.showElectives = true;
      this.left = 1;
       console.log("user has completed 1 elective requiremnt"); 
       console.log(this.incompletedElectiveArray);
     }
     if(this.count == 2){
       this.left = 0; 
      console.log("user has completed elective requiremnt"); 
      
    }

  console.log("final list of incompleted core courses:");
  console.log(this.incompletedArray);
  console.log(this.incompletedElectiveArray);
  }
}





