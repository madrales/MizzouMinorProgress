import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import ITcourses from 'src/assets/ITminorcourses.json'; 
import ITcourses1 from 'src/assets/ITminorcourses1.json';
import Minors from 'src/assets/COEminors.json'
import { Minor } from 'src/app/interfaces/minor';
import { Storage } from '@ionic/storage'


@Injectable({
  providedIn: 'root'
})
export class CompletedITService {

  ITMinorArray: Course[] = [];
  ITMinorDataName: string = "ITMinor";

  ITminorArray2: Course[] = [];
  ITMinorDataName2: string = "ITMinor2";

  completedArray: String[] = [];
  completedDataName: string = "completed"; 

  incompletedArray: String[] = [];
  incompletedDataName: string = "incompleted"; 

  constructor(private storage: Storage) {

    this.getData(this.completedDataName).then((completed)  => {
      if(completed){
        this.completedArray = completed; 
      }
    }); 

    this.getData(this.ITMinorDataName).then((ITMinor)  => {
      if(ITMinor){
        this.ITMinorArray = ITMinor; 
      }
    });

    this.getData(this.ITMinorDataName2).then((ITMinor2)  => {
      if(ITMinor2){
        this.ITminorArray2 = ITMinor2; 
      }
    });

    this.getData(this.incompletedDataName).then((incompleted)  => {
      if(incompleted){
        this.incompletedArray = incompleted; 
      }
    });

    
  //import IT sequence 1 json file courses 
    this.ITMinorArray = localStorage.getItem("ITcourses") !== null
      ? JSON.parse(localStorage.getItem("ITcourses"))
      :ITcourses;

  //import IT sequence 2 json file courses 
   this.ITminorArray2 = localStorage.getItem("ITcourses1") !== null
   ? JSON.parse(localStorage.getItem("ITcourses1"))
   :ITcourses1;
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

  getITMinor(){
    return(this.ITMinorArray);
  }

  getITMinor2(){
    return(this.ITminorArray2);
  }

  getIncompleted(){
    return(this.incompletedArray);
  }



  addCompleted(completedObject: String) {
    if (completedObject != null) {


      this.completedArray.push(completedObject);
      this.setData2(this.completedDataName, this.completedArray); 

      return this.completedArray; 
    }
  }

  addIncompleted(incompletedObject: String) {
    if (incompletedObject != null) {


      this.incompletedArray.push(incompletedObject);
      this.setData2(this.incompletedDataName, this.incompletedArray); 

      return this.incompletedArray; 
    }
  }

  clearIncomplete() {
        this.incompletedArray.splice(0, this.incompletedDataName.length);
      
    this.setData2(this.incompletedDataName, this.incompletedArray); 

    return this.incompletedArray; 
  }

  clearCompleted() {
    this.completedArray.splice(0,this.completedArray.length);
  
    this.setData2(this.completedDataName, this.completedArray); 

    return this.completedArray;
  }

   //Array to get JSON file of all IT courses 
  //  getData2(){ 
  //   this.data = localStorage.getItem("ITcourses") !== null ? JSON.parse(localStorage.getItem("ITcourses")) : ITcourses; 
  //   console.log(this.data); 

  //   return this.data; 
  // }

  //function to add a completed course 


}