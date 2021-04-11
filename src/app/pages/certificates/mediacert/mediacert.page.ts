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
  public test: String;
  public status: String; 
  public showElectives: Boolean = false; 

  completedArray: Array<String>; 
  incompletedArray: Array<Course>;
  incompletedElectiveArray: Array<Course>;

  MediaTechCoreArray: Array<Course>; 
  MediaTechElectiveArray: Array<Course>; 

  constructor(
    private model: MediaTechDesignCertificateService, 
    private formBuilder: FormBuilder) {

      
    this.completedCoursesForm = this.formBuilder.group({
      completedCourse:["", [Validators.required],]
    });

    this.MediaTechCoreArray = this.model.getMediaTechCore(); 
    console.log("Core courses" + this.MediaTechCoreArray);

    this.MediaTechElectiveArray = this.model.getMediaTechElective(); 
    console.log("Elective courses" + this.MediaTechElectiveArray);
    
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

    clear(){
    this.completedArray  = this.model.clearCompleted();
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;
    this.status = "";
  }

  ionViewWillEnter(){
    this.model.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.model.getData("MediaTechCore").then((MediaTechCore)  => {
      if(MediaTechCore){
        this.MediaTechCoreArray = MediaTechCore; 
      }
    }); 

    this.model.getData("MediaTechElective").then((MediaTechElective)  => {
      if(MediaTechElective){
        this.MediaTechElectiveArray = MediaTechElective; 
      }
    }); 
  }

    check(){

    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.MediaTechCoreArray.length;
    var electivesLength = this.MediaTechElectiveArray.length; 

    console.log("Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }


    for (let i = 0; i < certificateLength; i++) {
     
      var found = this.completedArray.includes( this.MediaTechCoreArray[i].courseID);

      console.log("found " + this.MediaTechCoreArray[i].courseID+ " :" + found);

      if(!found){

        console.log("Course not completed: " + this.MediaTechCoreArray[i].courseID);
        this.addIncompeltedCourse(this.MediaTechCoreArray[i]);

      }

      var count = electivesLength;
      for (let i = 0; i < electivesLength; i++) {
        
        console.log( "total electives " + electivesLength);

        var found = this.completedArray.includes(this.MediaTechElectiveArray[i].courseID);
  
        console.log("found " + this.MediaTechElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          break;
        
  
        }

        if(!found){
          count--; 
        }
     }
     if(count == 0 ){
      this.showElectives = true;
       console.log("user still needs to complete an elective course");
       console.log(this.showElectives);
     }
     if(count >0){
       console.log("user has completed the elective requiremnt"); 
      
     }

  console.log("final list of incompleted core courses:");
  console.log(this.incompletedArray);
  }
}
}



