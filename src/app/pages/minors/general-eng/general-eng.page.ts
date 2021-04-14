import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EngineeringMinorService } from 'src/app/services/EngineeringMinor/engineering-minor.service';

@Component({
  selector: 'app-general-eng',
  templateUrl: './general-eng.page.html',
  styleUrls: ['./general-eng.page.scss'],
})
export class GeneralEngPage implements OnInit {
  private completedCoursesForm: FormGroup;
  public test: String;
  public status: String; 
  public showElectives: Boolean = false; 
  public count = 0;
  public left = 1; 


  completedArray: Array<String>; 
  incompletedArray: Array<Course>;
  incompletedElectiveArray: Array<Course>;

  EngineeringCoreArray: Array<Course>; 
  EngineeringElectiveArray: Array<Course>; 

  constructor(    private model: EngineeringMinorService, 
    private formBuilder: FormBuilder) { 

      this.completedCoursesForm = this.formBuilder.group({
        completedCourse:["", [Validators.required],]
      });
  
      this.EngineeringCoreArray = this.model.getEngineeringCore(); 
      console.log("Core courses" + this.EngineeringCoreArray);
  
      this.EngineeringElectiveArray = this.model.getEngineeringElective(); 
      console.log("Elective courses" + this.EngineeringElectiveArray);
      
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

    this.model.getData("EngineeringCore").then((EngineeringCore)  => {
      if(EngineeringCore){
        this.EngineeringCoreArray = EngineeringCore; 
      }
    }); 

    this.model.getData("EngineeringElective").then((EngineeringElective)  => {
      if(EngineeringElective){
        this.EngineeringElectiveArray = EngineeringElective; 
      }
    }); 
  }

  check(){

    this.left = 1; 
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.EngineeringCoreArray.length;
    var electivesLength = this.EngineeringElectiveArray.length; 

    console.log("Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    for(let i= 0; i < 5; i++){
      var found = this.completedArray.includes( this.EngineeringCoreArray[i].courseID);
      console.log("found " + this.EngineeringCoreArray[i].courseID+ " :" + found);
  
  
          if(!found){
          console.log("Course not completed: " + this.EngineeringCoreArray[i].courseID);
          this.addIncompeltedCourse(this.EngineeringCoreArray[i]);
        }
  

    }
    
 
      var found1 = this.completedArray.includes( this.EngineeringCoreArray[5].courseID);
      var found2 = this.completedArray.includes(this.EngineeringCoreArray[6].courseID); 
      console.log("found " + this.EngineeringCoreArray[5].courseID+ " :" + found);
      console.log("found " + this.EngineeringCoreArray[6].courseID+ " :" + found);

        if(!found1 && !found2){

          console.log("Courses not completed: " + this.EngineeringCoreArray[5].courseID);
          console.log(" and "  + this.EngineeringCoreArray[6].courseID);
          this.addIncompeltedCourse(this.EngineeringCoreArray[5]);
          this.addIncompeltedCourse(this.EngineeringCoreArray[6]);

          
        }

      this.count = 0;
      console.log("Electives lenght: " + electivesLength);
      console.log("count :" + this.count);
      for (let i = 0; i < electivesLength; i++) {
        

        var found = this.completedArray.includes(this.EngineeringElectiveArray[i].courseID);
  
        console.log("found " + this.EngineeringElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          this.count++;
          continue;
        }

        if(!found){
          this.addIncompeltedElectiveCourse(this.EngineeringElectiveArray[i]);
          console.log("added to incomplete electives : " + this.EngineeringElectiveArray[i]);
         continue; 
        }
     }

     if(this.count == 0 ){
       this.left =1; 
      this.showElectives = true;
       console.log("user still needs to complete elective courses");
       console.log(this.showElectives);
     }
     if(this.count == 1){

      this.left = 0;
	console.log("user has completed elective requiremnt"); 	
 console.log(this.showElectives);
     }


  console.log("final list of incompleted core courses:");
  console.log(this.incompletedArray);
  console.log(this.incompletedElectiveArray);
  }

}
