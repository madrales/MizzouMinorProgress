import { Component, OnInit } from '@angular/core';

//importing course object interface
import { Course } from 'src/app/interfaces/course';

//importing service for completed IT courses
import { CompletedITService } from 'src/app/services/completed-it.service'; 

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.page.html',
  styleUrls: ['./all-courses.page.scss'],
})
export class AllCoursesPage implements OnInit {
  private todo : FormGroup;
  data: Array<Course>; 

  constructor(private model: CompletedITService, private formBuilder: FormBuilder) {
    this.data = model.getData(); 
   }

  ngOnInit(): void {
  }
}
