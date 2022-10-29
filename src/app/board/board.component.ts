import { Component, OnInit } from '@angular/core';
import { delay, refCount } from 'rxjs';

interface Mapper {
  row: number;
  col: number;
  possibleSolution:number
}



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  Rows: Array<number> = [1,2,3,4,5,6,7,8,9];
  Cols: Array<number> = [1,2,3,4,5,6,7,8,9];
  SudokuGrid: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
  HashMapSolution: Mapper[] =  [];
  sudokuNumber:number = 0;
  boardFilled: boolean = true;
  visualizeSudokuAlgorithm: boolean = false;


  ChooseBorderType(rowOrCol:number): string  {
    let BorderBold: string = rowOrCol % 3 === 0 && rowOrCol != 9 ? "3px solid black": "1px solid #CCC";
    return BorderBold;
  }


  recieveInput(input: any) {
    
    let value: number  = input.value == "" ? 0 : parseInt(input.value)
    let row: number = input.row-1;
    let col: number = input.col-1
    
    this.SudokuGrid[row][col] = this.checkIfInputCorrect(row,col,value);
    
  }


  visualizeAlgorithm(evt: Event){
    let inputElement: HTMLButtonElement = (<HTMLButtonElement>evt.target);
    this.visualizeSudokuAlgorithm = true;
    let elementSibling: HTMLElement = <HTMLElement>inputElement.previousElementSibling;
    let elementSiblingChildren : HTMLCollection = elementSibling.children;
    let arrayOfChildren: Array<Element> = Array.from(elementSiblingChildren)
    
    this.HashMapSolution.forEach((sol) => {
      arrayOfChildren.forEach((child)=> {
        let appChildren : HTMLCollection = child.children;
        let appchildForRow: Array<Element> = Array.from(appChildren)
        setTimeout(()=>{
          appchildForRow.forEach((appChild)=> {
            let row : number = parseInt(appChild.id.split("_")[0]);
            let col: number = parseInt(appChild.id.split("_")[1]);
            let inputElement:HTMLInputElement = <HTMLInputElement>appChild
            let rowOfHash:number = sol["row"];
            let colOfHash:number = sol["col"];
             
              if (row==rowOfHash+1 && col == colOfHash+1) {
                
                
                  inputElement.innerText = sol["possibleSolution"].toString();
                  inputElement.style.fontFamily = "Helvetica, Arial, sans-serif";
                  inputElement.style.fontSize = "24px";
                  inputElement.style.textAlign = "center";
                  inputElement.style.paddingTop = "12px"
                
              }
            
          })
        },12)

      })

    }) 
    
  }


  clearGrid(evt: Event){
    for (var i = 0; i <=8; i++){
      for (var j = 0; j <=8; j++){
        this.SudokuGrid[i][j] = 0;
      }
    }
    

    let inputElement: HTMLButtonElement = (<HTMLButtonElement>evt.target);
    this.visualizeSudokuAlgorithm = true;
    let elementSibling: HTMLElement = <HTMLElement>inputElement.parentElement;
    let elementSibling2: HTMLElement = <HTMLElement>elementSibling.parentElement;
    let elementSibling3: HTMLElement = <HTMLElement>elementSibling2.parentElement;
    
    let elementSibling4: HTMLCollection = elementSibling3.getElementsByClassName("container board2 grad")
    
    let elementSiblingChildren : HTMLCollection = elementSibling4[0].children;
    let arrayOfChildren: Array<Element> = Array.from(elementSiblingChildren)
    
    
      arrayOfChildren.forEach((child)=> {
        let appChildren : HTMLCollection = child.children;
        let appchildForRow: Array<Element> = Array.from(appChildren)
        
          appchildForRow.forEach((appChild)=> {
            let inputElement:HTMLInputElement = <HTMLInputElement>appChild
            
            inputElement.innerText = ""
          })
        
      })

      this.boardFilled = true;
      this.visualizeSudokuAlgorithm = false;
      this.HashMapSolution.splice(0,this.HashMapSolution.length)
  }

  checkIfInputCorrect(row:number,col:number,value:number): number{
    let ConditionCheck : boolean = this.checkConditions(row,col,value);
    if( ConditionCheck == true ) {
      return value;
    }else{
      
      
      return 0;
      
    }

    
  }


  solveSudokuPuzzle(row:number,col:number) : boolean
  {
    
    // this is the break statement that checks if the sudoku is solved
      if (row == 8 && col == 8) {
        let SumToNine: number = 9*(9+1)/2
        let SumOfLastRow = this.SudokuGrid[row].reduce((accumulator:number,value:number) => {
          return accumulator + value
        },0);
        this.boardFilled = false;
        this.SudokuGrid[row][col] = this.SudokuGrid[row][col] != 0 ? this.SudokuGrid[row][col] : SumToNine - SumOfLastRow;
        return true;
      }
      if ( col == 9) {
        row++;
        col = 0;
      }
      
      if (this.SudokuGrid[row][col] != 0 ){return this.solveSudokuPuzzle(row,col + 1)}

      for (var i = 1; i <10; i++)
      {
            if (this.checkConditions(row,col,i)){
          
                //console.log(this.SudokuGrid[row][col],row,col);
              this.SudokuGrid[row][col] = i;
              let mapper:Mapper = {row:row,col:col,possibleSolution:i};
              this.HashMapSolution.push(mapper);
              if (this.solveSudokuPuzzle(row,col+1)){
                return true
              }
            
            // go into new column
            
            }
            this.SudokuGrid[row][col] = 0;
      }
          
      return false; 
  }


  checkConditions(row:number,col:number,N:number):boolean {
    var smallGridI:number = ~~(row/3);
    var smallGridJ:number = ~~(col/3);
    
    if (N == 0 || N == -1) {
      return true;
    }
    // checks for condition in small grid

    for (var i = 0; i <= 2; i++) {
      for (var j = 0; j <= 2; j++) {
        if (N === this.SudokuGrid[smallGridI*3 + i][smallGridJ*3 + j]
            && row != smallGridI*3 + i && col != smallGridJ*3 + j ){
            return false;
          }
        }
        
      }
    
    // checks for condition in row
    for (var i = 0; i <= 8; i++) {

      if (N === this.SudokuGrid[row][i] && col !=i ){
        return false;
      }
    }
    // checks for condition in column
    for (var i = 0; i <= 8; i++) {
      if (N === this.SudokuGrid[i][col] && row !=i ){
        return false;
      }
    }
    
    
    return true;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
