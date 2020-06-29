import { Component, OnInit, Input } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-setting-input',
  templateUrl: './setting-input.component.html',
  styleUrls: ['./setting-input.component.sass']
})
export class SettingInputComponent implements OnInit {

  constructor() { }

  @Input() property: string;
  @Input() value: string;


  ngOnInit(): void {
  }

}
