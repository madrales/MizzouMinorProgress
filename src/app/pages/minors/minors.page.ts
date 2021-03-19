import { Component, OnInit } from '@angular/core';

import { Minor } from 'src/app/interfaces/minor';

import { CompletedITService } from 'src/app/services/completed-it.service';
import { MinorService } from 'src/app/services/minor-service.service';

import{ FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-minors',
  templateUrl: './minors.page.html',
  styleUrls: ['./minors.page.scss'],
})
export class MinorsPage implements OnInit {
  data: Array<Minor>;

  constructor(private model: MinorService) { 
    this.data = model.getData();
  }

  ngOnInit() {
  }

}
