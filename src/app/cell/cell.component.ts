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

  validate(evt: KeyboardEvent) {

      // Handle paste
     
      let key = evt.keyCode || evt.which;
      let key1 = String.fromCharCode(key);
      
      var regex = /[0-9]|\./;
      if( !regex.test(key1) ) {
        evt.returnValue = false;
        if(evt.preventDefault) evt.preventDefault();
      }
  }


  constructor() { }

  ngOnInit(): void {
  }


}
