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
  public count = 0; 
  public completedSequence = false; 
  public showAllSeqs = false; 
  public completedMinor = false; 
  public completed3000 = false;
  public left = 0; 
  public remaining = false; 

  public show1610Seqs = false; 
  public show1610Seq1 = false;  

  completedArray: Array<String>;

  incompletedArray: Array<String>;
  ITMinorArray: Array<Course>;
  ITMinorArray2: Array<Course>;

  //1040
  ITMinorSeq1: Array<String> = [ "2830", "4830"];
  ITMinorSeq2: Array<String> = ["2910", "3910 OR 4910"]; 
  ITMinorSeq3: Array<String> = ["4405", "4425"]

  //1610
  ITMinorSeq4: Array<String> = ["2610", "3610 OR 4610"]; 
  ItMinorSeq5: Array<String> = ["3640", "4640"]; 

  //1040 full
  ITMinorSeq1a: Array<String> = [ "1040", "2830", "4830"];
  ITMinorSeq2a: Array<String> = [ "1040","2910", "3910 OR 4910"]; 
  ITMinorSeq3a: Array<String> = ["1040","4405", "4425"]

  //1610 full
  ITMinorSeq4a: Array<String> = ["1610","2610", "3610 OR 4610"]; 
  ItMinorSeq5a: Array<String> = ["1610","3640", "4640"]; 


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

    var submittedLenght;
    
    if(this.completedCoursesForm.value.completedCourse != null){
       submittedLenght = this.completedCoursesForm.value.completedCourse.length;
    }

    for (let i =0; i < submittedLenght; i++){
      this.completedArray =  this.model.addCompleted(this.completedCoursesForm.value.completedCourse[i]);
    }
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

    var foundSeq4 = this.completedArray.includes("2610"); 
    var foundSeq5 = this.completedArray.includes("3640"); 
    // var foundSeq6 = this.completedArray.includes("4405"); 

    if(foundSeq1or2or3 && (foundSeq1 || foundSeq2 || foundSeq3) ){ //if 1040 is found

      if(foundSeq1){ //check for 2830
        var found = this.completedArray.includes("4830"); 

        if(!found){ //move on to 4830
          this.addIncompeltedCourse("INFOTC4830"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the first sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false; 
          
        }
      }

      if(foundSeq2){ //check for 2910

        var found = this.completedArray.includes("3910 OR 4910");

        if(!found){ //move on to 3910/4910
          this.addIncompeltedCourse("INFTOC3910 OR INFOTC4910"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the second sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
        }
      }

       if(foundSeq3){ //check for 4405

        var found = this.completedArray.includes("4425"); 

        if(!found){
          this.addIncompeltedCourse("INFOTC4425"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the third sequence"); 
          this.completedSequence = true;
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
        }
      }
      else{
        console.log("present user with sequnces 1 2 or 3"); 
        this.show1040Seqs = true; 
      }
    }
    else if( foundSeq4or5 && !foundSeq4 && !foundSeq5){
        console.log("present user with sequnces 4 and 5"); 
        this.show1610Seqs = true; 
      
    }
    else if (foundSeq4or5  && (foundSeq4 || foundSeq5)){
      if(foundSeq4){ //check for 2610
        var found = this.completedArray.includes("3610 OR 4610"); 

        if(!found){ //move on to 3610/4610
          this.addIncompeltedCourse("INFOTC3610 OR INFOTC4610"); 
          this.show1610Seq1 = true; 
        }
        else{
          console.log("user completed the 4th sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
        }
      }
      else if(foundSeq5){ //check for 3640

        var found = this.completedArray.includes("4640");

        if(!found){ //move on to 4640
          this.addIncompeltedCourse("INFTOC4640"); 
          this.show1040Seq1 = true; 
        }
        else{
          console.log("user completed the 5th sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
        }
      }
    }
    else if (!foundSeq1or2or3 && !foundSeq4or5){
      console.log("user hasn't completed any sequences"); 
      this.showAllSeqs = true; 
    }

    console.log("completed courses: " + this.completedArray); 

    //checking for 3 3000 + courses now
     this.count = 0; 

    for( var i = 0; i < this.completedArray.length; i++){

      var x = this.completedArray[i].charAt(0); 

      if(x == '3' || x == '4'){
        console.log("Found a 3000+ course!"); 
        this.count++; 
      }

      if( this.count == 3){
        break;
      }

    }

    if(this.count == 3){
      console.log("User has compelted the 3 3000+ courses."); 
      this.completed3000 = true; 
    }
    else if(this.count == 2){
      console.log("User needs to complete 1")
    }
    else if(this.count == 1){
      console.log("User needs to complete 1 3000+ course."); 
    }
    else{
      console.log("User still needs to complete 3 3000+ courses."); 
    }

    if(this.completedSequence == true){
      this.show1040Seq1 = false; 
      this.show1610Seq1 = false; 
    }

    if(this.completedSequence == true && this.count == 3 && this.completedArray.length >= 5){
      this.completedMinor = true; 
      console.log("user has completed the IT minor."); 
      this.completedSequence = false; 
      this.show1610Seq1 = false; 
      this.show1040Seq1 = false;
      this.completed3000 = false; 
      
    }
    if(this.completedSequence == true && this.count == 3 && this.completedArray.length <= 5){
      console.log("user has some courses left to complete."); 
      this.left = 5 - this.completedArray.length; 
      this.remaining = true;
      this.show1610Seq1 = false; 
      this.show1040Seq1 = false;
      
    }


  }

  clear(){
    this.completedArray  = this.model.clearCompleted();
    this.incompletedArray = this.model.clearIncomplete();
    this.completedSequence = false; 
    this.status = "";
    this.show1040Seqs = false; 
    this.show1040Seq1 = false; 
    this.completedMinor = false; 
    this.count = 0; 
    this.completed3000 = false; 
    this.showAllSeqs = false; 
    this.left = 0; 
    this.remaining = false; 
    
    this.show1610Seqs = false; 
    this.show1610Seq1 = false; 
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
