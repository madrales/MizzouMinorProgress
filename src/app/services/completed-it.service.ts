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

  data: Array<Course> = ITcourses;
  completedArray: Completed[] = [];
  completedDataName: string = "completed"; 

  constructor(private storage: Storage) {

    this.getData(this.completedDataName).then((completed)  => {
      if(completed){
        this.completedArray = completed; 
      }
    }); 

    this.data = localStorage.getItem("ITcourses") !== null
      ? JSON.parse(localStorage.getItem("ITcourses"))
      :ITcourses;
   }

   getData(name: string){
    return this.storage.get(name); 
  }

  setData(name: string, data: Completed[]){
    this.storage.set(name, data); 
  }

  getCompleted(){
    return(this.completedArray); 
  }

  getCompletedIndex(){
    return(this.completedArray[0].courseID);
  }

  addCompleted(completedObject: Completed) {
    if (completedObject != null) {


      this.completedArray.push(completedObject);
      this.setData(this.completedDataName, this.completedArray); 

      return this.completedArray; 
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