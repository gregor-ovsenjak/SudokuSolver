import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  Rows: Array<number> = [1,2,3,4,5,6,7,8,9];
  Cols: Array<number> = [1,2,3,4,5,6,7,8,9];
  SudokuGrid: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
  boardFilled: boolean = true;

  ChooseBorderType(rowOrCol:number): string  {
    let BorderBold: string = rowOrCol % 3 === 0 && rowOrCol != 9 ? "3px solid black": "1px solid #CCC";
    return BorderBold;
  }

  recieveInput(input: any) {
    console.log(input.row,input.col,input.value);
    this.SudokuGrid[input.row-1][input.col -1] = parseInt(input.value);
  }

  solveSudokuPuzzle() {
    console.log(this.SudokuGrid)
  }


  constructor() { }

  ngOnInit(): void {
  }

}
