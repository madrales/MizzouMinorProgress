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
  public webDevCompleted: Boolean = false; 
  public webDevCore: Boolean = false; 
  public webDevRan: Boolean = false; 
  public webShowPercent: Boolean = false; 
  public webDevPercent = 0; 
  public webCount = 0; 


  webDevIncompletedArray: Array<Course>;
  webDevIncompletedElectiveArray: Array<Course>;

  WebDevCoreArray: Array<Course>; 
  WebDevElectiveArray: Array<Course>; 


  //Media Certificate Vars
  public mediaShowElectives: Boolean = false; 
  public mediaLeft = 3; 
  public mediaCompleted: Boolean = false; 
  public mediaCore: Boolean = false; 
  public mediaRan: Boolean = false; 
  public showMediaPercent: Boolean = false; 
  public mediaPercent = 0; 

  
  mediaIncompletedArray: Array<Course>;
  mediaIncompletedElectiveArray: Array<Course>;

  MediaTechCoreArray: Array<Course>; 
  MediaTechElectiveArray: Array<Course>; 

  //Cybersecurity Certificate Vars 

  public cyberSecShowElectives: Boolean = false; 
  public cyberSecCompleted: Boolean = false; 
  public cyberSecCore: Boolean = false; 
  public cyberSecRan: Boolean = false; 
  public cyberPercent =0;
  public cyberShowPercent: Boolean = false; 
  public cyberSecCount;

  cyberSecIncompletedArray: Array<Course>;
  cyberSecIncompletedElectiveArray: Array<Course>;

  CyberSecCoreArray: Array<Course>;
  CyberSecElectiveArray: Array<Course>; 



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
  
      //CYBER SECURITY ARRAYS

      this.CyberSecCoreArray = this.cyberSecModel.getCyberSecCore(); 
      console.log("Core courses" + this.CyberSecCoreArray);
  
      this.CyberSecElectiveArray = this.cyberSecModel.getCyberSecElective(); 
      console.log("Elective courses" + this.CyberSecElectiveArray);
    
      this.cyberSecIncompletedArray = this.cyberSecModel.getIncompleted(); 
      console.log("incompleted core" + this.cyberSecIncompletedArray);
  
      this.cyberSecIncompletedElectiveArray = this.cyberSecModel.getIncompletedElectives();
      console.log("incompleted elective" + this.cyberSecIncompletedElectiveArray);
   }

  ngOnInit() {}

  addCourse() {
    //NOTE: WE ARE USING WEBDEVMODEL TO KEEP TRACK OF COMPELTED COURSES 

    
    var submittedLenght 
    
    if(this.completedCoursesForm.value.completedCourse != null){

    
    submittedLenght = this.completedCoursesForm.value.completedCourse.length;
    }

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

  //CYBER SECURITY INCOMPLETED METHODS

  cyberSecAddIncompeltedCourse(incompletedObject: Course ) {
    this.cyberSecIncompletedArray =  this.cyberSecModel.addIncompleted(incompletedObject);   
  }

  cyberSecAddIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.cyberSecIncompletedElectiveArray =  this.cyberSecModel.addIncompletedElective(incompletedObject);   
  }



  clear(){

    this.completedArray  = this.webDevModel.clearCompleted();

    //CLEAR WEBDEV VARS
    this.webDevIncompletedArray = this.webDevModel.clearIncomplete();
    this.webDevIncompletedElectiveArray = this.webDevModel.clearIncompleteElectives();
    this.webDevShowElectives = false;
    this.webDevCompleted = false; 
    this.webDevCore = false; 
    this.webShowPercent = false; 
    this.webDevRan = false;
    this.webCount = 0;
    this.webDevPercent = 0; 

    //CLEAR MEDIA VARS
    this.mediaIncompletedArray = this.mediaModel.clearIncomplete();
    this.mediaIncompletedElectiveArray = this.mediaModel.clearIncompleteElectives();
    this.mediaShowElectives = false;
    this.mediaCompleted = false;
    this.mediaCore = false; 
    this.mediaRan = false; 
    this.showMediaPercent = false; 
    this.mediaPercent = 0; 

    //CLEAR CYBERSECURITY VARS
    this.cyberSecIncompletedArray = this.cyberSecModel.clearIncomplete();
    this.cyberSecIncompletedElectiveArray = this.cyberSecModel.clearIncompleteElectives();
    this.cyberSecShowElectives = false;
    this.cyberSecCompleted = false; 
    this.cyberSecCore = false; 
    this.cyberSecRan = false; 
    this.cyberShowPercent =false; 
    this.cyberSecCount = 0; //was ==0
    this.cyberPercent =0; 

    console.log("Cleared!"); 
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

    //CYBER
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

  webDevCheck(){

    this.webDevRan = true; 
    this.webShowPercent = true; 

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


      this.webCount = 0;
      console.log("Electives lenght: " + electivesLength);
      console.log("count :" + this.webCount);
      for (let i = 0; i < electivesLength; i++) {
        

        var found = this.completedArray.includes(this.WebDevElectiveArray[i].courseID);
  
        console.log("found " + this.WebDevElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          this.webCount++;
          continue;
        }

        if(!found){
          this.webDevAddIncompeltedElectiveCourse(this.WebDevElectiveArray[i]);
          console.log("added to incomplete electives : " + this.WebDevElectiveArray[i]);
         continue; 
        }
     }

     if(this.webCount == 0 ){
       this.webDevLeft =2; 
      this.webDevShowElectives = true;
       console.log("user still needs to complete elective courses");
       console.log(this.webDevShowElectives);
     }
     if(this.webCount == 1){
      this.webDevShowElectives = true;
      this.webDevLeft = 1;
       console.log("user has completed 1 elective requiremnt"); 
       console.log(this.webDevIncompletedElectiveArray);
     }
     if(this.webCount == 2){
       this.webDevLeft = 0; 
      console.log("user has completed elective requiremnt"); 

      if(this.webDevIncompletedArray.length == 0){
        this.webDevCompleted = true; 
        this.webShowPercent = false;
      }
      
    }
    
    if(this.webDevIncompletedArray.length != null ){

      var ios = this.webDevIncompletedArray.includes( this.WebDevCoreArray[1]);
    var android = this.webDevIncompletedArray.includes(this.WebDevCoreArray[2]); 
    var web = this.webDevIncompletedArray.includes(this.WebDevCoreArray[0]); 


    if((ios || android) && web){
      var a = this.webCount;
       console.log(a);
      this.webDevPercent = (a/4)*100;
      console.log("3 PERCENT DONE:" + this.webDevPercent);
    }
    else if((web && !ios && !android) || (ios || android && !web)){
        var a = 1 + this.webCount;
        console.log(a);
        this.webDevPercent = (a/4)*100; 
        console.log("1 PERCENT DONE"+  this.webDevPercent);
    }
    else if((!ios || !android) && !web){
        var a = 2 + this.webCount;
         console.log(a);
        this.webDevPercent = (a/4)*100;
        console.log("2 PERCENT DONE:" + this.webDevPercent);
      }

    
  
    }

    if(this.webDevIncompletedArray.length != 0){
      this.webDevCore = true; 
    }
    if(this.webDevIncompletedArray.length == 0){
      this.webDevCore = false; 
    }

    
  console.log("final list of incompleted core courses:");
  console.log(this.webDevIncompletedArray);
  console.log(this.webDevIncompletedElectiveArray);
  }

  mediaCheck(){

    this.mediaRan= true;
    this.showMediaPercent = true; 

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
      this.mediaCompleted = true;
      this.showMediaPercent = false; 
      console.log("user has completed 3 elective requiremnt"); 
    }

  console.log("final list of incompleted core courses:");
  console.log(this.mediaIncompletedArray);
  console.log(this.mediaIncompletedElectiveArray);

  if(this.mediaIncompletedArray != null){
    var a = 1 - this.mediaIncompletedArray.length + count;
    console.log(a);
     this.mediaPercent = (a/4)*100; 
    console.log("PERCENT DONE"+  this.mediaPercent);

  }
  }



  if(this.mediaIncompletedArray.length != 0){
    this.mediaCore = true; 
  }
  if(this.mediaIncompletedArray.length == 0){
    this.mediaCore = false; 
  }
}

cyberSecCheck(){

  this.cyberSecRan = true; 
  this.cyberShowPercent = true;

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
if(this.cyberSecIncompletedArray != null){

  if(this.cyberSecCount >0){
    var a = 4 - this.cyberSecIncompletedArray.length + 1;
    console.log(a);
     this.cyberPercent = (a/5)*100; 
    console.log("PERCENT DONE"+  this.cyberPercent);
  }

  if(this.cyberSecCount == 0){
    var a = 4 - this.cyberSecIncompletedArray.length;
    console.log(a);
     this.cyberPercent = (a/5)*100; 
    console.log("PERCENT DONE"+  this.cyberPercent);
  }
}

if(this.cyberSecIncompletedArray.length != 0){
  this.cyberSecCore = true; 
}
if(this.cyberSecIncompletedArray.length == 0){
  this.cyberSecCore = false; 
}

if(this.cyberSecIncompletedArray.length == 0 && this.cyberSecCount > 0){
  this.cyberSecCompleted = true;
  this.cyberShowPercent = false; 
}

}


}
