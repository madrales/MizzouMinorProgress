import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { CyberSecurityCertificateService } from 'src/app/services/CyberSecurityCertificate/cyber-security-certificate.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-cybersec-certifcate',
  templateUrl: './cybersec-certifcate.page.html',
  styleUrls: ['./cybersec-certifcate.page.scss'],
})
export class CybersecCertifcatePage implements OnInit {

  private completedCoursesForm: FormGroup;
  completedArray: Array<String>; 

  public cyberSecShowElectives: Boolean = false; 
  public cyberSecCompleted: Boolean = false; 
  public cyberSecCore: Boolean = false; 
  public cyberSecCount;


  cyberSecIncompletedArray: Array<Course>;
  cyberSecIncompletedElectiveArray: Array<Course>;

  CyberSecCoreArray: Array<Course>;
  CyberSecElectiveArray: Array<Course>; 

  constructor(
    private cyberSecModel: CyberSecurityCertificateService, 
    private formBuilder: FormBuilder) { 

    this.completedCoursesForm = this.formBuilder.group({
      completedCourse:["", [Validators.required],]
    });

    this.CyberSecCoreArray = this.cyberSecModel.getCyberSecCore(); 
    console.log("Core courses" + this.CyberSecCoreArray);

    this.CyberSecElectiveArray = this.cyberSecModel.getCyberSecElective(); 
    console.log("Elective courses" + this.CyberSecElectiveArray);
    
    this.completedArray = this.cyberSecModel.getCompleted();
  
    this.cyberSecIncompletedArray = this.cyberSecModel.getIncompleted(); 
    console.log("incompleted core" + this.cyberSecIncompletedArray);

    this.cyberSecIncompletedElectiveArray = this.cyberSecModel.getIncompletedElectives();
    console.log("incompleted elective" + this.cyberSecIncompletedElectiveArray);
  }

  ngOnInit() {}

  addCourse() {

    var submittedLenght = this.completedCoursesForm.value.completedCourse.length;

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.cyberSecModel.addCompleted(this.completedCoursesForm.value.completedCourse[i]);

    }

    console.log("initial submitted courses: " + this.completedArray);
    console.log("initial submitted number courses: " + this.completedArray.length);
  }

  cyberSecAddIncompeltedCourse(incompletedObject: Course ) {
    this.cyberSecIncompletedArray =  this.cyberSecModel.addIncompleted(incompletedObject);   
  }

  cyberSecAddIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.cyberSecIncompletedElectiveArray =  this.cyberSecModel.addIncompletedElective(incompletedObject);   
  }

  clear(){
    this.completedArray  = this.cyberSecModel.clearCompleted();
    this.completedCoursesForm.reset();
    
    this.cyberSecIncompletedArray = this.cyberSecModel.clearIncomplete();
    this.cyberSecIncompletedElectiveArray = this.cyberSecModel.clearIncompleteElectives();
    this.cyberSecShowElectives = false;
    this.cyberSecCompleted = false; 
    this.cyberSecCore = false;  
    this.cyberSecCount == 0;
    console.log("Cleared!"); 
  }

  cyberSecCheck(){

    this.cyberSecIncompletedArray = this.cyberSecModel.clearIncomplete();
    this.cyberSecIncompletedElectiveArray = this.cyberSecModel.clearIncompleteElectives();
    this.cyberSecShowElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.CyberSecCoreArray.length;
    var electivesLength = this.CyberSecElectiveArray.length; 

    console.log("CYBER: Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    for (let i = 0; i < certificateLength; i++) {
     
      var found = this.completedArray.includes( this.CyberSecCoreArray[i].courseID);

      console.log("found " + this.CyberSecCoreArray[i].courseID+ " :" + found);

      if(!found){

        console.log("Course not completed: " + this.CyberSecCoreArray[i].courseID);
        this.cyberSecAddIncompeltedCourse(this.CyberSecCoreArray[i]);

      }

      this.cyberSecCount = electivesLength;
      for (let i = 0; i < electivesLength; i++) {
        
        console.log( "total electives " + electivesLength);

        var found = this.completedArray.includes(this.CyberSecElectiveArray[i].courseID);
  
        console.log("found " + this.CyberSecElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          break;
        }

        if(!found){
          this.cyberSecCount--; 
        }
     }
     if(this.cyberSecCount == 0 ){
      this.cyberSecShowElectives = true;
       console.log("user still needs to complete an elective course");
     }
     if(this.cyberSecCount >0){
       console.log("user has completed the elective requiremnt"); 
     }

  console.log("final list of incompleted core courses:");
  console.log(this.cyberSecIncompletedArray);
  }

  if(this.cyberSecIncompletedArray.length != 0){
    this.cyberSecCore = true; 
  }
  if(this.cyberSecIncompletedArray.length == 0){
    this.cyberSecCore = false; 
  }
  
  if(this.cyberSecIncompletedArray.length == 0 && this.cyberSecCount > 0){
    this.cyberSecCompleted = true;
  }
}



  ionViewWillEnter(){
    this.cyberSecModel.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 


    this.cyberSecModel.getData("CybSecCore").then((CybSecCore)  => {
      if(CybSecCore){
        this.CyberSecCoreArray = CybSecCore; 
      }
    }); 

    this.cyberSecModel.getData("CybSecElective").then((CybSecElective)  => {
      if(CybSecElective){
        this.CyberSecElectiveArray = CybSecElective; 
      }
    }); 
  }

  

}
