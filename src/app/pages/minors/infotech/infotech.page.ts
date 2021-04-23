import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { CompletedITService } from 'src/app/services/completed-it.service'; 

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// @NgModule({
//   declarations: [],
//   imports: [],
//   exports: [],
//   schemas:[CUSTOM_ELEMENTS_SCHEMA]
// })
@Component({
  selector: 'app-infotech',
  templateUrl: './infotech.page.html',
  styleUrls: ['./infotech.page.scss'],
})
export class InfotechPage implements OnInit {
  public completedCoursesForm: FormGroup;
  public test: String;
  public status: String;
  public show1040Seqs = false; 
  public show1040Seq1 = false; 
  public showSeq3 = false; 

  completedArray: Array<String>;

  incompletedArray: Array<String>;
  ITMinorArray: Array<Course>;
  ITMinorArray2: Array<Course>;

  ITMinorSeq1: Array<String> = [ "2830", "4830"];
  ITMinorSeq2: Array<String> = ["2910", "3910 OR 4910"]; 
  ITMinorSeq3: Array<String> = ["4405", "4410"]
  ITMinorSeq4: Array<String> = ["1610", "2610", "3610 OR 4610"]; 
  ItMinorSeq5: Array<String> = ["1610","3640", "4640"]; 


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

  addIncompeltedCourse(incompletedObject: String ) {

    this.incompletedArray =  this.model.addIncompleted(incompletedObject);
    
  }

  check2(){

    var foundSeq1or2or3 = this.completedArray.includes("1040"); 
    var foundSeq4or5 = this.completedArray.includes("1610"); 

    var foundSeq1 = this.completedArray.includes("2830"); 
    var foundSeq2 = this.completedArray.includes("2910"); 
    var foundSeq3 = this.completedArray.includes("4405"); 

    if(foundSeq1or2or3 && (foundSeq1 || foundSeq2 || !foundSeq3)){ //if 1040 is found

      if(foundSeq1){ //check for 2830
        var found = this.completedArray.includes("4830"); 

        if(!found){ //move on to 4830
          this.addIncompeltedCourse("INFOTC4830"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the first sequence"); 
        }
      }

      else if(foundSeq2){ //check for 2910

        var found = this.completedArray.includes("3910 OR 4910");

        if(!found){ //move on to 3910/4910
          this.addIncompeltedCourse("INFTOC3910 OR INFOTC4910"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the second sequence"); 
        }
      }

      else if(foundSeq3){ //check for 4405

        var found = this.completedArray.includes("INFOTC4410"); 

        if(!found){
          this.addIncompeltedCourse("INFOTC4410"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the third sequence"); 
        }
      }

      else{
        console.log("present user with sequnces 1 2 or 3"); 
        this.show1040Seqs = true; 
      }
    }
    else if (foundSeq4or5){

    }
    else if (!foundSeq1or2or3 && !foundSeq4or5){

    }

    console.log(this.incompletedArray); 

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
       // this.addIncompeltedCourse(this.ITMinorArray[i]);

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
    this.show1040Seqs = false; 
    this.show1040Seq1 = false; 
    this.showSeq3 = false; 
  }

  clearAll(){
    this.clear(); 
    this.completedCoursesForm.reset(); 
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
