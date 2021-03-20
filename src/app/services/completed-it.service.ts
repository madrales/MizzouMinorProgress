import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import ITcourses from 'src/assets/ITminorcourses.json'; 
import Minors from 'src/assets/COEminors.json'
import { Minor } from 'src/app/interfaces/minor';
import { Storage } from '@ionic/storage'


@Injectable({
  providedIn: 'root'
})
export class CompletedITService {

  ITMinorArray: Course[] = [];
  ITMinorDataName: string = "ITMinor";

  completedArray: String[] = [];
  completedDataName: string = "completed"; 

  incompletedArray: Course[] = [];
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

    this.getData(this.incompletedDataName).then((incompleted)  => {
      if(incompleted){
        this.incompletedArray = incompleted; 
      }
    });

    this.ITMinorArray = localStorage.getItem("ITcourses") !== null
      ? JSON.parse(localStorage.getItem("ITcourses"))
      :ITcourses;
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

  addIncompleted(incompletedObject: Course) {
    if (incompletedObject != null) {


      this.incompletedArray.push(incompletedObject);
      this.setData(this.incompletedDataName, this.incompletedArray); 

      return this.incompletedArray; 
    }
  }


   //Array to get JSON file of all IT courses 
  //  getData2(){ 
  //   this.data = localStorage.getItem("ITcourses") !== null ? JSON.parse(localStorage.getItem("ITcourses")) : ITcourses; 
  //   console.log(this.data); 

  //   return this.data; 
  // }

  //function to add a completed course 


}