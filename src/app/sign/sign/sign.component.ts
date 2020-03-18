import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.sass']
})
export class SignComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    if(this.router.url === '/sign') {
      console.log("sign");
      this.router.navigateByUrl('/sign/in');
    }
  }

}
