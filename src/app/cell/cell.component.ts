import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  
  color:string = "transparent";
  input:string = "";


  changeColorOnEnter() {
    this.color = "rgba(54, 124, 255, 0.483)"
  }

  
  changeColorOnLeave() {
    this.color = "transparent"
  }


  validate(evt: KeyboardEvent) {
      
      let key: string  = evt.key;
      var regex:RegExp = /[0-9]/;
      
      if( !regex.test(key) && evt.key !== "Backspace" ) {
        if(evt.preventDefault) evt.preventDefault();
      }
  }


  constructor() { }

  ngOnInit(): void {
  }


}
