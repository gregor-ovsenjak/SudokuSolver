import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  
  color:string = "transparent";
  
  changeColorOnEnter() {
    this.color = "rgba(54, 124, 255, 0.483)"
  }
  changeColorOnLeave() {
    this.color = "transparent"
  }

  constructor() { }

  ngOnInit(): void {
  }


}
