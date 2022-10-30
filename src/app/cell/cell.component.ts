import { HtmlParser } from '@angular/compiler';
import { Component, OnInit,Output,EventEmitter ,Input,OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnChanges {
  
  color:string = "transparent";
  input:string = "";
  

  @Output() inputEvent = new EventEmitter<any>();
  @Input() sudokuNumber: number = 0;

  changeColorOnEnter() {
    this.color = "rgba(54, 124, 255, 0.483)";
  }

  
  changeColorOnLeave() {
    this.color = "transparent";
  }


  updateInput(evt:Event) {
    let inputElement: HTMLInputElement = (<HTMLInputElement>evt.target)
    this.input = inputElement.value;
    inputElement.value = "";
    let parent: HTMLElement = <HTMLElement> inputElement.parentElement;
    let row : number = parseInt(parent.id.split("_")[0]);
    let col: number = parseInt(parent.id.split("_")[1]);
    let objectEmitedToSudokuBoard : any = {value:this.input, row:row, col:col};

    this.inputEvent.emit( objectEmitedToSudokuBoard);
  }


  validate(evt: KeyboardEvent) {
      
      let key: string  = evt.key;
      var regex:RegExp = /[1-9]/;
      
      if( !regex.test(key) && evt.key !== "Backspace" ) {
        if(evt.preventDefault) evt.preventDefault();
      }
  }


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }


}
