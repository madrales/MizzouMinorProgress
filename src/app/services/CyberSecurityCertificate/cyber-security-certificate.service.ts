import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import  CyberSecurityCoreCourses  from "src/assets/CyberSecurityCertificate.json";
import CyberSecurityElective from "src/assets/CyberSecurityCertificate3000.json"; 
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class CyberSecurityCertificateService {

  CybSecCoreArray: Course[] = [];
  CybSecCoreDataName: string = "CybSecCore";

  CybSecElectiveArray: Course[] = [];
  CybSecElectiveDataName: string = "CybSecElective";

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

    this.getData(this.CybSecCoreDataName).then((CybSecCore)  => {
      if(CybSecCore){
        this.CybSecCoreArray = CybSecCore; 
      }
    });

    this.getData(this.CybSecElectiveDataName).then((CybSecElective)  => {
      if(CybSecElective){
        this.CybSecElectiveArray = CybSecElective; 
      }
    });
    

    
  //import CyberSec core json file courses 
    this.CybSecCoreArray = localStorage.getItem("CyberSecurityCoreCourses") !== null
      ? JSON.parse(localStorage.getItem("CyberSecurityCoreCourses"))
      :CyberSecurityCoreCourses;

      
  //import CyberSec elective json file courses 
   this.CybSecElectiveArray = localStorage.getItem("CyberSecurityElective") !== null
   ? JSON.parse(localStorage.getItem("CyberSecurityElective"))
   :CyberSecurityElective;
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

  getCyberSecCore(){
    return(this.CybSecCoreArray);
  }

  getCyberSecElective(){
    return(this.CybSecElectiveArray);
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



