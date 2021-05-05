import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ComputerScienceMinorService } from 'src/app/services/ComputerScienceMinor/computer-science-minor.service'; 

@Component({
  selector: 'app-compsci',
  templateUrl: './compsci.page.html',
  styleUrls: ['./compsci.page.scss'],
})
export class CompsciPage implements OnInit {
  public completedCoursesForm: FormGroup;
  public test: String;
  public status: String; 
  public showElectives: Boolean = false; 
  public count = 0;
  public left = 1; 
  public ran = false; 
  public percent; 

  public CSCoreLeft = false; 
  public CSCompleted = false; 

  public option1 = false; 
  public option2 = false; 
  public option3 = false; 
  public option4 = false; 
  public option5 = false; 
  public option6 = false; 



  completedArray: Array<String>; 
  completedElectivesArray: Array<String>;
  incompletedArray: Array<Course>;
  incompletedElectiveArray: Array<Course>;

  CSCoreArray: Array<Course>; 
  CSElectiveArray: Array<Course>; 


  constructor(private model: ComputerScienceMinorService, 
    private formBuilder: FormBuilder) {

      
      this.completedCoursesForm = this.formBuilder.group({
        completedCourse:["", [Validators.required],]
      });

      this.CSCoreArray = this.model.getCSCore(); 
      console.log("Core courses" + this.CSCoreArray);
  
      this.CSElectiveArray = this.model.getCSElective(); 
      console.log("Elective courses" + this.CSElectiveArray);
      
      this.completedArray = this.model.getCompleted();

      this.completedElectivesArray = this.model.getCompletedElectives(); 
    
      this.incompletedArray = this.model.getIncompleted(); 
      console.log("incompleted core" + this.incompletedArray);
  
      this.incompletedElectiveArray = this.model.getIncompletedElectives();
      console.log("incompleted elective" + this.incompletedElectiveArray);

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

    console.log("initial submitted courses: " + this.completedArray);
    console.log("initial submitted number courses: " + this.completedArray.length);
  }

  addCompletedElectiveCourse(completedObject: String){
    this.completedElectivesArray = this.model.addCompletedElectives(completedObject);
  }

  addIncompeltedCourse(incompletedObject: Course ) {
    this.incompletedArray =  this.model.addIncompleted(incompletedObject);   
  }

  addIncompeltedElectiveCourse(incompletedObject: Course ) {
    this.incompletedElectiveArray =  this.model.addIncompletedElective(incompletedObject);   
  }

  clearAll(){
    this.clear(); 
    this.completedCoursesForm.reset(); 
  }

  clear(){

    this.completedArray  = this.model.clearCompleted();
    this.completedElectivesArray = this.model.clearCompletedElectives(); 
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;
    this.status = "";

    this.ran = false; 
    this.CSCoreLeft = false; 
    this.CSCompleted = false; 
    this.option1 = false; 
    this.option2 = false; 
    this.option3 = false; 
    this.option4 = false; 
    this.option5 = false; 
    this.option6 = false; 
    console.log("Cleared!"); 
  }

  clearInput(){
    this.completedCoursesForm.reset(); 
  }

  ionViewWillEnter(){
    this.model.getData("completed").then((completed) => {
      if(completed){
        this.completedArray= completed; 
      }
    }); 

    this.model.getData("completedElectives").then((completedElectives) => {

      if(completedElectives){
        this.completedElectivesArray = completedElectives;
      }
    });

    this.model.getData("CSCore").then((CSCore)  => {
      if(CSCore){
        this.CSCoreArray = CSCore; 
      }
    }); 

    this.model.getData("CSElective").then((CSElective)  => {
      if(CSElective){
        this.CSElectiveArray = CSElective; 
      }
    }); 
  }

  check(){

    this.CSCoreLeft = true; 
    this.ran = true; 
    

    this.left = 3; 
    this.incompletedArray = this.model.clearIncomplete();
    this.incompletedElectiveArray = this.model.clearIncompleteElectives();
    this.showElectives = false;

    var completedLength = this.completedArray.length;
    var certificateLength = this.CSCoreArray.length;
    var electivesLength = this.CSElectiveArray.length; 

    console.log("Number of user completed courses: " + completedLength);

    for (let i =0; i< completedLength; i++){
      this.completedArray[i] = String(this.completedArray[i]);
    }

    var found0 = this.completedArray.includes( this.CSCoreArray[0].courseID);
    console.log("found " + this.CSCoreArray[0].courseID+ " :" + found0);


        if(!found0){
        console.log("Course not completed: " + this.CSCoreArray[0].courseID);
        this.addIncompeltedCourse(this.CSCoreArray[0]);
      }

      var found1 = this.completedArray.includes( this.CSCoreArray[1].courseID);
      console.log("found " + this.CSCoreArray[1].courseID+ " :" + found1);
  
  
          if(!found1){
          console.log("Course not completed: " + this.CSCoreArray[1].courseID);
          this.addIncompeltedCourse(this.CSCoreArray[1]);
        }

        var found2 = this.completedArray.includes(this.CSCoreArray[2].courseID);
        console.log("found " + this.CSCoreArray[2].courseID + ": " + found2); 

          if(!found2){
  
            console.log("Courses not completed: " + this.CSCoreArray[2].courseID);
            // console.log(" and "  + this.CSCoreArray[3].courseID);
            this.addIncompeltedCourse(this.CSCoreArray[2]);
            // this.addIncompeltedCourse(this.CSCoreArray[3]);
  
          }
  
        if(this.incompletedArray.length == 0){
          this.CSCoreLeft = false; 
        }

      this.count = 0;
      console.log("Electives lenght: " + electivesLength);
      console.log("count :" + this.count);
      for (let i = 0; i < electivesLength; i++) {
        

        var found = this.completedArray.includes(this.CSElectiveArray[i].courseID);
  
        console.log("found " + this.CSElectiveArray[i].courseID+ " :" + found);
  
        if(found){
          this.count++;
          this.addCompletedElectiveCourse(this.CSElectiveArray[i].courseID);
          continue;
        }

        if(!found){
          this.addIncompeltedElectiveCourse(this.CSElectiveArray[i]);
          console.log("added to incomplete electives : " + this.CSElectiveArray[i]);
         continue; 
        }
     }

     console.log("OVERHERE!!!!!");
     console.log("how many completed electives? " + this.completedElectivesArray.length);
     if(this.completedElectivesArray.length ==  0){
        console.log("User Needs to complete 3 more electives, 1 being leveled 3000+"); 
        this.showElectives = true; 
        this.option1 = true; 
      }

      var x;  
      var firstElement;  
     
      for(let i = 0; i < this.completedElectivesArray.length; i++){
       x = this.completedElectivesArray[i];

      firstElement = x.charAt(5); 
       console.log("first element of this string: " + firstElement);

       if(firstElement == '3' || firstElement == '4')
         break; 
         

      }

     for(let i = 0; i < this.completedElectivesArray.length; i++){
      if(this.completedElectivesArray.length >= 3){
        console.log("moving on"); 
        if(firstElement == '3' || firstElement == '4'){
          console.log("User has completed the electives requirement");
          this.option2 = true; 
          this.showElectives = false; 

          if(this.incompletedArray.length == 0){
            this.ran = false; 
            this.CSCompleted = true; 
            

          }
          break;
        }
      }
      else if(this.completedElectivesArray.length == 2){
        if(firstElement == '3' || firstElement == '4'){
          console.log("The User needs to complete 1 more elective of any level.");
          this.option3 = true; 
          this.showElectives = true; 
        }
        else if(firstElement != '3' && firstElement != '4'){
          console.log("The User needs to complete 1 more elective, leveled 3000+"); 

          this.model.clearIncompleteElectives(); 

      
         
          for(let i = 0; i < this.CSElectiveArray.length; i++){
            var y;  

            y = this.CSElectiveArray[i].courseID.charAt(5); 

            if( y == '3' || y == '4'){
              this.addIncompeltedElectiveCourse(this.CSElectiveArray[i]); 
            }

          this.showElectives = true;
          this.option4 = true; 
        }
      }
      }
      else if(this.completedElectivesArray.length == 1){
        if(firstElement == '3' || firstElement == '4'){
          console.log("The User needs to complete 2 more elective of any level.");
          this.option5 = true; 
          this.showElectives = true; 
        }
        else if(firstElement != '3' && firstElement != '4'){
          console.log("The User needs to complete 2 more elective, 1 being leveled 3000+"); 
          this.showElectives = true; 
          this.option6 = true; 
        }
      }

     }

   
     var a = 3 - this.incompletedArray.length; 
     var b = this.completedElectivesArray.length; 

     this.percent = Math.round(((a+ b)/6)*100); 
     console.log("percent completed: " + this.percent); 
     if(this.percent >= 100){
       this.percent = 100; 
     }



  console.log("final list of incompleted core courses:");
  console.log(this.incompletedArray);
  console.log(this.incompletedElectiveArray);
  }
  

}
