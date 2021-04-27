import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import  WebDevCoreCourses  from "src/assets/WebDevCertificate.json";
import WebDevElective from "src/assets/WebDevCertificateElectives.json"; 
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WebDevCertificateService {
  
  WebDevCoreArray: Course[] = [];
  WebDevCoreDataName: string = "WebDevCore"; 

  WebDevElectiveArray: Course[] = [];
  WebDevElectiveDataName: string = "WebDevElective";

  completedArray: String[] = [];
  completedDataName: string = "completed"; 

  incompletedArray: Course[] = [];
  incompletedDataName: string = "incompleted"; 

  incompletedElectivesArray: Course[] = [];
  incompletedElectivesDataName: string = "incompletedElectives"; 

  constructor(private storage: Storage) { 

    this.getData(this.completedDataName).then((completed)  => {
      if(completed){
        this.completedArray = completed; 
      }
    }); 

    this.getData(this.incompletedDataName).then((incompleted)  => {
      if(incompleted){
        this.incompletedArray = incompleted; 
      }
    });

    this.getData(this.incompletedElectivesDataName).then((incompletedElectives)  => {
      if(incompletedElectives){
        this.incompletedElectivesArray = incompletedElectives; 
      }
    });

    this.getData(this.WebDevCoreDataName).then((WebDevCore)  => {
      if(WebDevCore){
        this.WebDevCoreArray = WebDevCore; 
      }
    });

    this.getData(this.WebDevElectiveDataName).then((WebDevElective)  => {
      if(WebDevElective){
        this.WebDevElectiveArray = WebDevElective; 
      }
    });

        //import MediaTech core json file courses 
        this.WebDevCoreArray = localStorage.getItem("WebDevCoreCourses") !== null
        ? JSON.parse(localStorage.getItem("WebDevCoreCourses"))
        :WebDevCoreCourses;
    
          
      //import MediaTech elective json file courses 
       this.WebDevElectiveArray = localStorage.getItem("WebDevElective") !== null
       ? JSON.parse(localStorage.getItem("WebDevElective"))
       :WebDevElective;
  }

  getData(name: string){
    return this.storage.get(name); 
  }

  setData(name: string, data: Completed[]){
    this.storage.set(name, data); 
  }

  setData2(name: string, data: String[]){
    this.storage.set(name, data); 
  }

  getCompleted(){
    return(this.completedArray); 
  }

  getIncompleted(){
    return(this.incompletedArray);
  }

  
  getIncompletedElectives(){
    return(this.incompletedElectivesArray);
  }

  getWebDevCore(){
    return(this.WebDevCoreArray);
  }

  getWebDevElective(){
    return(this.WebDevElectiveArray);
  }


  addCompleted(completedObject: String) {
    if (completedObject != null) {


      this.completedArray.push(completedObject);
      this.setData2(this.completedDataName, this.completedArray); 

      return this.completedArray; 
    }
  }

  addIncompleted(incompletedObject: Course) {
    if (incompletedObject != null) {


      this.incompletedArray.push(incompletedObject);
      this.setData(this.incompletedDataName, this.incompletedArray); 

      return this.incompletedArray; 
    }
  }


  addIncompletedElective(incompletedObject: Course) {
    if (incompletedObject != null) {


      this.incompletedElectivesArray.push(incompletedObject);
      this.setData(this.incompletedElectivesDataName, this.incompletedElectivesArray); 

      return this.incompletedElectivesArray; 
    }
  }
  clearIncomplete() {
        this.incompletedArray.splice(0, this.incompletedDataName.length);
      
    this.setData(this.incompletedDataName, this.incompletedArray); 

    return this.incompletedArray; 
  }

  clearIncompleteElectives() {
    this.incompletedElectivesArray.splice(0, this.incompletedElectivesDataName.length);
  
  this.setData(this.incompletedElectivesDataName, this.incompletedElectivesArray); 

  return this.incompletedElectivesArray; 
}

  clearCompleted() {
    this.completedArray.splice(0,this.completedArray.length);
  
    this.setData2(this.completedDataName, this.completedArray); 

    return this.completedArray;
  }
}





  


