import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import CSMinorCore from "src/assets/CSMinorCore.json";
import CSMinorElective from "src/assets/CSMinorElectives.json"; 
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ComputerScienceMinorService {

  CSCoreArray: Course[] = [];
  CSCoreDataName: string = "CSCore"; 

  CSElectiveArray: Course[] = [];
  CSElectiveDataName: string = "CSElective";

  completedArray: String[] = [];
  completedDataName: string = "completed"; 

  completedElectivesArray: String[] = []; 
  completedElectivesDataName: string = "completedElectives"; 

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

    this.getData(this.completedElectivesDataName).then((completedElectives) =>{
      if(completedElectives){
        this.completedElectivesArray = completedElectives;
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

    this.getData(this.CSCoreDataName).then((CSCore)  => {
      if(CSCore){
        this.CSCoreArray = CSCore; 
      }
    });

    this.getData(this.CSElectiveDataName).then((CSElective)  => {
      if(CSElective){
        this.CSElectiveArray = CSElective; 
      }
    });

    //import CS Minor core json file courses 
    this.CSCoreArray = localStorage.getItem("CSMinorCore") !== null
    ? JSON.parse(localStorage.getItem("CSMinorCore"))
    :CSMinorCore;

      
  //import CS Minor elective json file courses 
   this.CSElectiveArray = localStorage.getItem("CSMinorElective") !== null
   ? JSON.parse(localStorage.getItem("CSMinorElective"))
   :CSMinorElective;
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

  getCompletedElectives(){
    return(this.completedElectivesArray); 
  }

  getIncompleted(){
    return(this.incompletedArray);
  }

  
  getIncompletedElectives(){
    return(this.incompletedElectivesArray);
  }

  getCSCore(){
    return(this.CSCoreArray);
  }

  getCSElective(){
    return(this.CSElectiveArray);
  }


  addCompleted(completedObject: String) {
    if (completedObject != null) {


      this.completedArray.push(completedObject);
      this.setData2(this.completedDataName, this.completedArray); 

      return this.completedArray; 
    }
  }


  addCompletedElectives(completedObject: String) {
    if (completedObject != null) {


      this.completedElectivesArray.push(completedObject);
      this.setData2(this.completedElectivesDataName, this.completedElectivesArray); 

      return this.completedElectivesArray; 
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

  clearCompletedElectives() {
    this.completedElectivesArray.splice(0,this.completedElectivesArray.length);
  
    this.setData2(this.completedElectivesDataName, this.completedElectivesArray); 

    return this.completedElectivesArray;
  }

}
