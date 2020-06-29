import { Component, OnInit, Input } from '@angular/core';
import { ImageInputComponent } from 'src/app/auction/auction-form/image-input/image-input.component';

@Component({
  selector: 'app-limits-item',
  templateUrl: './limits-item.component.html',
  styleUrls: ['./limits-item.component.sass']
})
export class LimitsItemComponent implements OnInit {

  @Input() title: string;
  @Input() iconUrl: string;
  @Input() backgroundColor: string;
  @Input() value: string;
  @Input() subValue: string;
  @Input() unit: string;

  constructor() { }

  ngOnInit(): void {
  }

}
