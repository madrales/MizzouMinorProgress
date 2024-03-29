import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';

import { Course } from 'src/app/interfaces/course';

import { CompletedITService } from 'src/app/services/completed-it.service'; 

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { tick } from '@angular/core/testing';

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
  public showPercent = false; 
  public percent = 0; 
  public numSeq = 0; 
  public ran = false;
  public none = false; 

  public show1610Seqs = false; 
  public show1610Seq1 = false;  

  completedArray: Array<String>;

  incompletedArray: Array<String>;
  ITMinorArray: Array<Course>;
  ITMinorArray2: Array<Course>;

  //1040
  ITMinorSeq1: Array<String> = [ "INFTOC 2830", "INFTOC 4830"];
  ITMinorSeq2: Array<String> = ["INFTOC 2910", "INFTOC 3910 OR INFTOC 4910"]; 
  ITMinorSeq3: Array<String> = ["INFTOC 4405", "INFTOC 4425"]

  //1610
  ITMinorSeq4: Array<String> = ["INFTOC 2610", "INFTOC 3610 OR INFTOC 4610"]; 
  ItMinorSeq5: Array<String> = ["INFTOC 3640", "INFTOC 4640"]; 

  //1040 full
  ITMinorSeq1a: Array<String> = [ "INFTOC 1040", "INFTOC 2830", "INFTOC 4830"];
  ITMinorSeq2a: Array<String> = [ "INFTOC 1040","INFTOC 2910", "INFTOC 3910 OR INFTOC 4910"]; 
  ITMinorSeq3a: Array<String> = ["INFTOC 1040","INFTOC 4405", "INFTOC 4425"]

  //1610 full
  ITMinorSeq4a: Array<String> = ["INFTOC 1610","INFTOC 2610", "INFTOC 3610 OR INFTOC 4610"]; 
  ItMinorSeq5a: Array<String> = ["INFTOC 1610","INFTOC 3640", "INFTOC 4640"]; 


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

    this.ran = true; 
  
    console.log(this.showPercent); 

    var foundSeq1or2or3 = this.completedArray.includes("INFTOC 1040"); 
    var foundSeq4or5 = this.completedArray.includes("INFTOC 1610"); 

    var foundSeq1 = this.completedArray.includes("INFTOC 2830"); 
    var foundSeq2 = this.completedArray.includes("INFTOC 2910"); 
    var foundSeq3 = this.completedArray.includes("INFTOC 4405"); 

    var foundSeq4 = this.completedArray.includes("INFTOC 2610"); 
    var foundSeq5 = this.completedArray.includes("INFTOC 3640"); 
    // var foundSeq6 = this.completedArray.includes("4405"); 

    if(foundSeq1or2or3 && (foundSeq1 || foundSeq2 || foundSeq3) ){ //if 1040 is found

      if(foundSeq1){ //check for 2830
        var found = this.completedArray.includes("INFTOC 4830"); 

        if(!found){ //move on to 4830
          this.addIncompeltedCourse("INFTOC INFOTC4830"); 
          this.show1040Seq1 = true; 
          this.show1040Seqs = false; 
          console.log("hi"); 
          this.numSeq = 2;
          
        }
        else{
          console.log("user completed the first sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false; 
          this.numSeq = 2; 
          
        }
      }

      if(foundSeq2){ //check for 2910

        var found = this.completedArray.includes("INFTOC 3910 OR INFTOC 4910");

        if(!found){ //move on to 3910/4910
          this.addIncompeltedCourse("INFTOC 3910 OR INFOTC 4910"); 
          this.show1040Seq1 = true; 
          this.numSeq = 2;
        }
        else{
          console.log("user completed the second sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
          this.numSeq = 2; 
        }
      }

       if(foundSeq3){ //check for 4405

        var found = this.completedArray.includes("INFTOC 4425"); 

        if(!found){
          this.addIncompeltedCourse("INFOTC 4425"); 
          this.show1040Seq1 = true; 
          this.numSeq = 2; 
        }
        else{
          console.log("user completed the third sequence"); 
          this.completedSequence = true;
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
          this.numSeq = 2; 
        }
      }
    }
    else if( foundSeq4or5 && !foundSeq4 && !foundSeq5){
        console.log("present user with sequnces 4 and 5"); 
        this.show1610Seqs = true; 
        this.numSeq = 1; 
      
    }
    else if( foundSeq1or2or3 && !foundSeq1 && !foundSeq2 && !foundSeq3){
      console.log("present user with sequnces 1, 2 and 3"); 
      this.show1040Seqs = true; 
      this.numSeq = 1; 
    
  }
    else if (foundSeq4or5  && (foundSeq4 || foundSeq5)){
      if(foundSeq4){ //check for 2610
        var found = this.completedArray.includes("INFTOC 3610 OR INFTOC 4610"); 

        if(!found){ //move on to 3610/4610
          this.addIncompeltedCourse("INFOTC 3610 OR INFOTC 4610"); 
          this.show1610Seq1 = true; 
          this.numSeq = 2;
        }
        else{
          console.log("user completed the 4th sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
          this.numSeq = 2;
        }
      }
      else if(foundSeq5){ //check for 3640

        var found = this.completedArray.includes("INFTOC 4640");

        if(!found){ //move on to 4640
          this.addIncompeltedCourse("INFTOC 4640"); 
          this.show1040Seq1 = true; 
          this.numSeq = 2;
        }
        else{
          console.log("user completed the 5th sequence"); 
          this.completedSequence = true; 
          this.show1610Seq1 = false; 
          this.show1040Seq1 = false;
          this.numSeq = 2;
        }
      }
    }
    else if (!foundSeq1or2or3 && !foundSeq4or5){
      console.log("user hasn't completed any sequences"); 
      this.showAllSeqs = true; 
      this.numSeq = 0;
    }

    console.log("completed courses: " + this.completedArray); 

    //checking for 3 3000 + courses now
     this.count = 0; 

    for( var i = 0; i < this.completedArray.length; i++){

      var x = this.completedArray[i].charAt(7); 

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
      this.none = false; 
      this.completed3000 = true; 
    }
    else if(this.count == 2){
      this.none = false;
      console.log("User needs to complete 1")
    }
    else if(this.count == 1){
      this.none = false;
      console.log("User needs to complete 1 3000+ course."); 
    }
    else{
      this.none = true; 
      console.log("User still needs to complete 3 3000+ courses."); 
    }

    if(this.completedSequence == true){
      this.show1040Seq1 = false; 
      this.show1610Seq1 = false; 
    }

    if(this.completedSequence == true && this.count == 3 && this.completedArray.length >= 5){
      this.completedMinor = true; 
      this.ran = false; 
      console.log("user has completed the IT minor."); 
      // this.showPercent = false; 
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

  
    console.log("num seq: " + this.numSeq); 
    console.log("count : " + this.count); 


      this.percent = (((this.numSeq+(this.count)))/5) *100;
      console.log("percent completed: " + this.percent); 
  


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
    this.percent = 0; 
    this.none = false;
    this.ran = false; 
    // this.showPercent = false; 
    
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
