import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  Rows: Array<number> = [1,2,3,4,5,6,7,8,9];
  Cols: Array<number> = [1,2,3,4,5,6,7,8,9];
  constructor() { }

  ngOnInit(): void {
  }

}
