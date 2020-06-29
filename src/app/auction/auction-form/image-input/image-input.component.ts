import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.sass']
})
export class ImageInputComponent implements OnInit {

  @Input() isLoaded : boolean;
  @Input() imgSrc: string;

  constructor() { 

  }

  ngOnInit(): void {
  }

}
