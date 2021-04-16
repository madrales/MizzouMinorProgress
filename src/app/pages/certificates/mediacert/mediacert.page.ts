import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { MediaTechDesignCertificateService } from 'src/app/services/MediaTechDesignCertificate/media-tech-design-certificate.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-mediacert',
  templateUrl: './mediacert.page.html',
  styleUrls: ['./mediacert.page.scss'],
})
export class MediacertPage implements OnInit {

  private completedCoursesForm: FormGroup;
  completedArray: Array<String>; 
 
  public mediaShowElectives: Boolean = false; 
  public mediaLeft = 3; 
  public mediaCompleted: Boolean = false; 
  public mediaCore: Boolean = false; 
  public percent = 0; 
  public mediaRan: Boolean = false; 

  mediaIncompletedArray: Array<Course>;
  mediaIncompletedElectiveArray: Array<Course>;

  MediaTechCoreArray: Array<Course>; 
  MediaTechElectiveArray: Array<Course>; 

  constructor(
    private mediaModel: MediaTechDesignCertificateService, 
    private formBuilder: FormBuilder) {

      
    this.completedCoursesForm = this.formBuilder.group({
      completedCourse:["", [Validators.required],]
    });

    this.MediaTechCoreArray = this.mediaModel.getMediaTechCore(); 
    console.log("Core courses" + this.MediaTechCoreArray);

    this.MediaTechElectiveArray = this.mediaModel.getMediaTechElective(); 
    console.log("Elective courses" + this.MediaTechElectiveArray);
    
    this.completedArray = this.mediaModel.getCompleted();
  
    this.mediaIncompletedArray = this.mediaModel.getIncompleted(); 
    console.log("incompleted core" + this.mediaIncompletedArray);

    this.mediaIncompletedElectiveArray = this.mediaModel.getIncompletedElectives();
    console.log("incompleted elective" + this.mediaIncompletedElectiveArray);

    }

  ngOnInit() {}

    addCourse() {

    var submittedLenght = this.completedCoursesForm.value.completedCourse.length;

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.mediaModel.addCompleted(this.completedCoursesForm.value.completedCourse[i]);

    }

    console.log("initial submitted courses: " + this.completedArray);
    console.log("initial submitted number courses: " + this.completedArray.length);
  }

    mediaAddIncompeltedCourse(incompletedObject: Course ) {
    this.mediaIncompletedArray =  this.mediaModel.addIncompleted(incompletedObject);   
  }

  mediaAddIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.mediaIncompletedElectiveArray =  this.mediaModel.addIncompletedElective(incompletedObject);   
  }
    clear(){
    this.completedArray  = this.mediaModel.clearCompleted();

    this.mediaIncompletedArray = this.mediaModel.clearIncomplete();
    this.mediaIncompletedElectiveArray = this.mediaModel.clearIncompleteElectives();
    this.mediaShowElectives = false;
    this.mediaCompleted = false;
    this.mediaCore = false; 
    this.mediaRan = false; 
    this.percent = 0; 
    console.log("Cleared!"); 
  }

  ionViewWillEnter(){
    this.mediaModel.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.mediaModel.getData("MediaTechCore").then((MediaTechCore)  => {
      if(MediaTechCore){
        this.MediaTechCoreArray = MediaTechCore; 
      }
    }); 

    this.mediaModel.getData("MediaTechElective").then((MediaTechElective)  => {
      if(MediaTechElective){
        this.MediaTechElectiveArray = MediaTechElective; 
      }
    }); 
  }

    mediaCheck(){

      this.mediaRan= true;

    this.mediaLeft = 3; 
    this.mediaIncompletedArray = this.mediaModel.clearIncomplete();
    this.mediaIncompletedElectiveArray = this.mediaModel.clearIncompleteElectives();
    this.mediaShowElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.MediaTechCoreArray.length;
    var electivesLength = this.MediaTechElectiveArray.length; 

    console.log("Media: Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    for (let i = 0; i < certificateLength; i++) {
     
      var found = this.completedArray.includes( this.MediaTechCoreArray[i].courseID);

      console.log("found " + this.MediaTechCoreArray[i].courseID+ " :" + found);

      if(!found){

        console.log("Course not completed: " + this.MediaTechCoreArray[i].courseID);
        this.mediaAddIncompeltedCourse(this.MediaTechCoreArray[i]);

      }

      var count = 0;
      for (let i = 0; i < electivesLength; i++) {
        
        console.log( "total electives " + electivesLength);

        var found = this.completedArray.includes(this.MediaTechElectiveArray[i].courseID);
  
        console.log("found " + this.MediaTechElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          count++;
          continue;
        }

        if(!found){
          this.mediaAddIncompeltedElectiveCourse(this.MediaTechElectiveArray[i]);
          console.log("added to incomplete electives : " + this.MediaTechElectiveArray[i]);
         continue; 
        }
     }
     if(count == 0 ){
      this.mediaShowElectives = true;
      this.mediaLeft = 3; 
       console.log("user still needs to complete elective courses");
     }
     if(count == 1){
      this.mediaShowElectives = true;
      this.mediaLeft = 2; 
       console.log("user has completed 1 elective requiremnt");

     }
     if(count == 2){
      this.mediaShowElectives = true;
      this.mediaLeft = 1; 
      console.log("user has completed 2 elective requiremnt"); 
    }
    if(count == 3){
      this.mediaLeft = 0; 
      this.mediaCompleted = true;
      console.log("user has completed 3 elective requiremnt"); 
    }

  console.log("final list of incompleted core courses:");
  console.log(this.mediaIncompletedArray);
  console.log(this.mediaIncompletedElectiveArray);
  
  if(this.mediaIncompletedArray != null){
    var a = 1 - this.mediaIncompletedArray.length + count;
    console.log(a);
     this.percent = (a/4)*100; 
    console.log("PERCENT DONE"+  this.percent);

  }
  }

  if(this.mediaIncompletedArray.length != 0){
    this.mediaCore = true; 
  }
  if(this.mediaIncompletedArray.length == 0){
    this.mediaCore = false; 
  }
}
}



