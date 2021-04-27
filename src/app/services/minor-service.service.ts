import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import ITcourses from 'src/assets/ITminorcourses.json'; 
import Minors from 'src/assets/COEminors.json'
import { Minor } from 'src/app/interfaces/minor';


@Injectable({
  providedIn: 'root'
})
export class MinorService {

  minors: Array<Minor> = Minors;
  constructor() {
   }

   
  getData(){ 
    return this.minors;
  }
}