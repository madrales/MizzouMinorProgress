import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { WebDevCertificateService } from 'src/app/services/WebDevCertificate/web-dev-certificate.service';

import { MediaTechDesignCertificateService } from 'src/app/services/MediaTechDesignCertificate/media-tech-design-certificate.service';

import { CyberSecurityCertificateService } from 'src/app/services/CyberSecurityCertificate/cyber-security-certificate.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";


//NOTE: WE ARE USING WEBDEVMODEL TO KEEP TRACK OF COMPELTED COURSES 

@Component({
  selector: 'app-all-certs',
  templateUrl: './all-certs.page.html',
  styleUrls: ['./all-certs.page.scss'],
})
export class AllCertsPage implements OnInit {

  private completedCoursesForm: FormGroup;
  completedArray: Array<String>;

//Web Dev Certificate Vars
  public webDevShowElectives: Boolean = false; 
  public webDevLeft = 2; 


  webDevIncompletedArray: Array<Course>;
  webDevIncompletedElectiveArray: Array<Course>;

  WebDevCoreArray: Array<Course>; 
  WebDevElectiveArray: Array<Course>; 


  //Media Certificate Vars
  public mediaShowElectives: Boolean = false; 
  public mediaLeft = 3; 

  
  mediaIncompletedArray: Array<Course>;
  mediaIncompletedElectiveArray: Array<Course>;

  MediaTechCoreArray: Array<Course>; 
  MediaTechElectiveArray: Array<Course>; 



  constructor(
    private webDevModel: WebDevCertificateService, 
    private mediaModel: MediaTechDesignCertificateService, 
    private cyberSecModel: CyberSecurityCertificateService,
    private formBuilder: FormBuilder){

      this.completedCoursesForm = this.formBuilder.group({
        completedCourse:["", [Validators.required],]
      });

      this.completedArray = this.webDevModel.getCompleted();
  
      //WEB DEV ARRAYS
      this.WebDevCoreArray = this.webDevModel.getWebDevCore(); 
      console.log("WEB DEV Core courses" + this.WebDevCoreArray);
  
      this.WebDevElectiveArray = this.webDevModel.getWebDevElective(); 
      console.log("WEB DEV Elective courses" + this.WebDevElectiveArray);
      
    
      this.webDevIncompletedArray = this.webDevModel.getIncompleted(); 
      console.log("WEB DEV incompleted core" + this.webDevIncompletedArray);
  
      this.webDevIncompletedElectiveArray = this.webDevModel.getIncompletedElectives();
      console.log("WEB DEV incompleted elective" + this.webDevIncompletedElectiveArray);

      //MEDIA ARRAYS

      this.MediaTechCoreArray = this.mediaModel.getMediaTechCore(); 
      console.log("MEDIA Core courses" + this.MediaTechCoreArray);
  
      this.MediaTechElectiveArray = this.mediaModel.getMediaTechElective(); 
      console.log(" MEDIA Elective courses" + this.MediaTechElectiveArray);
      
      this.mediaIncompletedArray = this.mediaModel.getIncompleted(); 
      console.log("MEDIA incompleted core" + this.mediaIncompletedArray);
  
      this.mediaIncompletedElectiveArray = this.mediaModel.getIncompletedElectives();
      console.log("MEDIA incompleted elective" + this.mediaIncompletedElectiveArray);
  
   }

  ngOnInit() {}

  addCourse() {
    //NOTE: WE ARE USING WEBDEVMODEL TO KEEP TRACK OF COMPELTED COURSES 
    var submittedLenght = this.completedCoursesForm.value.completedCourse.length;

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.webDevModel.addCompleted(this.completedCoursesForm.value.completedCourse[i]);

    }

    console.log("initial submitted courses: " + this.completedArray);
    console.log("initial submitted number courses: " + this.completedArray.length);
  }


  //WEB DEV ADD INCOMPELTED METHODS
  webDevAddIncompeltedCourse(incompletedObject: Course ) {
    this.webDevIncompletedArray =  this.webDevModel.addIncompleted(incompletedObject);   
  }

  webDevAddIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.webDevIncompletedElectiveArray =  this.webDevModel.addIncompletedElective(incompletedObject);   
  }

  //MEDIA ADD INCOMPLETED METHODS
  medaiAddIncompeltedCourse(incompletedObject: Course ) {
    this.mediaIncompletedArray =  this.mediaModel.addIncompleted(incompletedObject);   
  }

  mediaAddIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.mediaIncompletedElectiveArray =  this.mediaModel.addIncompletedElective(incompletedObject);   
  }

  clear(){

    this.completedArray  = this.webDevModel.clearCompleted();

    //CLEAR WEBDEV VARS
    this.webDevIncompletedArray = this.webDevModel.clearIncomplete();
    this.webDevIncompletedElectiveArray = this.webDevModel.clearIncompleteElectives();
    this.webDevShowElectives = false;

    //CLEAR MEDIA VARS
    this.mediaIncompletedArray = this.mediaModel.clearIncomplete();
    this.mediaIncompletedElectiveArray = this.mediaModel.clearIncompleteElectives();
    this.mediaShowElectives = false;

    console.log("Cleared!"); 
  }
  
  check(){
    this.webDevCheck(); 
    this.mediaCheck();
  }

  ionViewWillEnter(){

    this.webDevModel.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    //WEBDEV
    this.webDevModel.getData("WebDevCore").then((WebDevCore)  => {
      if(WebDevCore){
        this.WebDevCoreArray = WebDevCore; 
      }
    }); 

    this.webDevModel.getData("WebDevElective").then((WebDevElective)  => {
      if(WebDevElective){
        this.WebDevElectiveArray = WebDevElective; 
      }
    }); 

    //MEDIA
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

  webDevCheck(){

    this.webDevLeft = 2; 
    this.webDevIncompletedArray = this.webDevModel.clearIncomplete();
    this.webDevIncompletedElectiveArray = this.webDevModel.clearIncompleteElectives();
    this.webDevShowElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.WebDevCoreArray.length;
    var electivesLength = this.WebDevElectiveArray.length; 

    console.log("Web dev: Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    var found = this.completedArray.includes( this.WebDevCoreArray[0].courseID);
    console.log("found " + this.WebDevCoreArray[0].courseID+ " :" + found);


        if(!found){
        console.log("Course not completed: " + this.WebDevCoreArray[0].courseID);
        this.webDevAddIncompeltedCourse(this.WebDevCoreArray[0]);
      }

      var found1 = this.completedArray.includes( this.WebDevCoreArray[1].courseID);
      var found2 = this.completedArray.includes(this.WebDevCoreArray[2].courseID); 
      console.log("found " + this.WebDevCoreArray[1].courseID+ " :" + found);
      console.log("found " + this.WebDevCoreArray[2].courseID+ " :" + found);

        if(!found1 && !found2){

          console.log("Courses not completed: " + this.WebDevCoreArray[1].courseID);
          console.log(" and "  + this.WebDevCoreArray[2].courseID);
          this.webDevAddIncompeltedCourse(this.WebDevCoreArray[1]);
          this.webDevAddIncompeltedCourse(this.WebDevCoreArray[2]);

          
        }


       var count = 0;
      console.log("Electives lenght: " + electivesLength);
      console.log("count :" + count);
      for (let i = 0; i < electivesLength; i++) {
        

        var found = this.completedArray.includes(this.WebDevElectiveArray[i].courseID);
  
        console.log("found " + this.WebDevElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          count++;
          continue;
        }

        if(!found){
          this.webDevAddIncompeltedElectiveCourse(this.WebDevElectiveArray[i]);
          console.log("added to incomplete electives : " + this.WebDevElectiveArray[i]);
         continue; 
        }
     }

     if(count == 0 ){
       this.webDevLeft =2; 
      this.webDevShowElectives = true;
       console.log("user still needs to complete elective courses");
       console.log(this.webDevShowElectives);
     }
     if(count == 1){
      this.webDevShowElectives = true;
      this.webDevLeft = 1;
       console.log("user has completed 1 elective requiremnt"); 
       console.log(this.webDevIncompletedElectiveArray);
     }
     if(count == 2){
       this.webDevLeft = 0; 
      console.log("user has completed elective requiremnt"); 
      
    }

  console.log("final list of incompleted core courses:");
  console.log(this.webDevIncompletedArray);
  console.log(this.webDevIncompletedElectiveArray);
  }

  mediaCheck(){

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
        this.medaiAddIncompeltedCourse(this.MediaTechCoreArray[i]);

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
      console.log("user has completed 3 elective requiremnt"); 
    }

  console.log("final list of incompleted core courses:");
  console.log(this.mediaIncompletedArray);
  console.log(this.mediaIncompletedElectiveArray);
  }
}


}
