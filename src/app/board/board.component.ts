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
    
    this.SudokuGrid[input.row-1][input.col -1] = parseInt(input.value);
  }

  solveSudokuPuzzle(row:number,col:number) {
   console.log(this.checkConditions(row,col));

  }


  checkConditions(row:number,col:number):boolean {
    var smallGridI:number = ~~(row/3);
    var smallGridJ:number = ~~(col/3);
    let conditions: Array<boolean> = [true,true,true];
    // checks for condition in small grid

    for (var i = 0; i <= 2; i++) {
      for (var j = 0; j <= 2; j++) {
        if (this.SudokuGrid[row][col] === this.SudokuGrid[smallGridI*3 + i][smallGridJ*3 + j] && row != smallGridI*3 + i && col != smallGridJ*3 + j){
            conditions[0] = false;
          }
        }
        
      }
    
    // checks for condition in row
    for (var i = 0; i <= 8; i++) {
      if (this.SudokuGrid[row][col] === this.SudokuGrid[row][i] && col !=i){
        conditions[1] = false;
      }
    }
    // checks for condition in column
    for (var i = 0; i <= 8; i++) {
      if (this.SudokuGrid[row][col] === this.SudokuGrid[i][col] && row !=i){
        conditions[2] = false;
      }
    }
    let result = conditions.every(Boolean);
    return result;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
