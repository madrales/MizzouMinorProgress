import { Component, OnInit } from '@angular/core';
//importing course object interface
import { Course } from 'src/app/interfaces/course';

//importing service for completed IT courses
import { CompletedITService } from 'src/app/services/completed-it.service'; 

@Component({
  selector: 'app-itcourse-selection',
  templateUrl: './itcourse-selection.component.html',
  styleUrls: ['./itcourse-selection.component.scss'],
})
export class ITCourseSelectionComponent implements OnInit {

  data: Array<Course>; 

  constructor(private model: CompletedITService) { 
    this.data = model.getData(); 
  }

  ngOnInit(): void {}



}
