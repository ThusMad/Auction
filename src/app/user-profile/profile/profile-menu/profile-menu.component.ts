import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.sass']
})
export class ProfileMenuComponent implements OnInit {

  @ViewChild('slider') slider; 
  
  buttons = [
    { 
      text: 'General', 
      isClicked: false, 
      link: "/profile/general"
    },
    { 
      text: 'Payment', 
      isClicked: false,
      link: "/profile/payment"
    },
    { 
      text: 'My Auctions', 
      isClicked: false,
      link: "/profile/auctions"
    },
    { 
      text: 'Settings', 
      isClicked: false, 
      link: "/profile/settings"
    }
  ]

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationStart) => {
      var uriBegining = '/' + event.url.split('/')[2];
      
      var button = this.buttons.find(a => a.link.includes(uriBegining))
      this.setActive(button);
  });
   }

  ngOnInit(): void {
  }

  setActive(button: any): void {
    for(let but of this.buttons) {
      if(but.isClicked && but === button)
        return
      but.isClicked = false;
    }
    if(button != undefined) {
      button.isClicked = true;
    }
    this.navigateToActive();
  }

  navigateToActive() {
    setTimeout(() => {
      let element = (document.getElementsByClassName("active"))[0];
      if(this.slider != undefined) {
        this.slider.nativeElement.style.left = this.offset(element).left + "px";
      }
    }, 100);
  }

  offset(el) : any {
    if(el != undefined) {
      var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left - 260 }
    }

    return { top: 0, left: 0 }
  }

}
