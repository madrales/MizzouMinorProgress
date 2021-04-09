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
  public test: String;
  public status: String; 
  public showElectives: Boolean = false; 

  completedArray: Array<String>; 
  incompletedArray: Array<Course>;
  incompletedElectiveArray: Array<Course>;

  CyberSecCoreArray: Array<Course>;
  CyberSecElectiveArray: Array<Course>; 

  constructor(private model: CyberSecurityCertificateService, private formBuilder: FormBuilder) { 

    this.completedCoursesForm = this.formBuilder.group({
      completedCourse:["", [Validators.required],]
      // completedCourse: ["", [Validators.required,
      //   Validators.pattern("^[0-9]*\.?[0-9]*$"),
      //   Validators.maxLength(4), 
      //   Validators.minLength(4)]],
    });

    this.CyberSecCoreArray = this.model.getCyberSecCore(); 
    console.log("Core courses" + this.CyberSecCoreArray);

    this.CyberSecElectiveArray = this.model.getCyberSecElective(); 
    console.log("Elective courses" + this.CyberSecElectiveArray);
    
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

    // this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse); 
    // this.completedCoursesForm.reset(); 
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

  check(){

    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.CyberSecCoreArray.length;
    var electivesLength = this.CyberSecElectiveArray.length; 

    console.log("Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }


   

    for (let i = 0; i < certificateLength; i++) {
     
      var found = this.completedArray.includes( this.CyberSecCoreArray[i].courseID);

      console.log("found " + this.CyberSecCoreArray[i].courseID+ " :" + found);

      if(!found){

        console.log("Course not completed: " + this.CyberSecCoreArray[i].courseID);
        this.addIncompeltedCourse(this.CyberSecCoreArray[i]);

      }

      var count = electivesLength;
      for (let i = 0; i < electivesLength; i++) {
        
        console.log( "total electives " + electivesLength);

        var found = this.completedArray.includes(this.CyberSecElectiveArray[i].courseID);
  
        console.log("found " + this.CyberSecElectiveArray[i].courseID+ " :" + found);
  
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

    // this.model.getData("incompletedElectives").then((incompletedElectives) => {
    //   if(incompletedElectives){
    //     this.incompletedElectiveArray = incompletedElectives;
    //   }
    // });


    this.model.getData("CybSecCore").then((CybSecCore)  => {
      if(CybSecCore){
        this.CyberSecCoreArray = CybSecCore; 
      }
    }); 

    this.model.getData("CybSecElective").then((CybSecElective)  => {
      if(CybSecElective){
        this.CyberSecElectiveArray = CybSecElective; 
      }
    }); 
  }

  

}
