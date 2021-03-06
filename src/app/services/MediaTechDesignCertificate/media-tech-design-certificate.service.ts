import { Injectable } from '@angular/core';
import { Course } from "src/app/interfaces/course";
import { Completed } from "src/app/interfaces/completed";
import  MediaTechDesignCoreCourses  from "src/assets/MediaTechDesignCertificate.json";
import MediaTechDesignElective from "src/assets/MediaTechDesignCertificateElectives.json"; 
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MediaTechDesignCertificateService {

  MediaTechCoreArray: Course[] = [];
  MediaTechCoreDataName: string = "MediaTechCore"; 

  MediaTechElectiveArray: Course[] = [];
  MediaTechElectiveDataName: string = "MediaTechElective";

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

    this.getData(this.MediaTechCoreDataName).then((MediaTechCore)  => {
      if(MediaTechCore){
        this.MediaTechCoreArray = MediaTechCore; 
      }
    });

    this.getData(this.MediaTechElectiveDataName).then((MediaTechElective)  => {
      if(MediaTechElective){
        this.MediaTechElectiveArray = MediaTechElective; 
      }
    });

    //import MediaTech core json file courses 
    this.MediaTechCoreArray = localStorage.getItem("MediaTechDesignCoreCourses") !== null
    ? JSON.parse(localStorage.getItem("MediaTechDesignCoreCourses"))
    :MediaTechDesignCoreCourses;

      
  //import MediaTech elective json file courses 
   this.MediaTechElectiveArray = localStorage.getItem("MediaTechDesignElective") !== null
   ? JSON.parse(localStorage.getItem("MediaTechDesignElective"))
   :MediaTechDesignElective;

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

  getMediaTechCore(){
    return(this.MediaTechCoreArray);
  }

  getMediaTechElective(){
    return(this.MediaTechElectiveArray);
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
