import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import ITcourses from 'src/assets/ITminorcourses.json';  


@Injectable({
  providedIn: 'root'
})
export class CompletedITService {

  data: Array<Course> = ITcourses;
  constructor() {
    this.data = localStorage.getItem("ITcourses") !== null
      ? JSON.parse(localStorage.getItem("ITcourses"))
      :ITcourses;
   }

   addData(formObject: Course){
   this.data = localStorage.getItem("ITcourses") != null ? JSON.parse(localStorage.getItem("ITcourses")) : ITcourses; 

   this.data.push(formObject); 
   console.log(this.data); 
   localStorage.setItem('ITcourses', JSON.stringify(this.data));

   return this.data; 
   }

   
  getData(){ 
    this.data = localStorage.getItem("ITcourses") !== null ? JSON.parse(localStorage.getItem("ITcourses")) : ITcourses; 
    console.log(this.data); 

    return this.data; 
  }
}