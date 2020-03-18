import { Component,ElementRef, OnInit, HostListener, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})

export class NavigationComponent implements OnInit {

  navButtons : HTMLCollectionOf<Element>;
  currentSelected: Element;
  slider: HTMLDivElement;

  constructor(private router: Router) {
    this.navButtons = document.getElementsByClassName("nav-item");
    //this.slider = (document.getElementsByClassName("slider") as HTMLCollectionOf<HTMLDivElement>)[0];

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      for(var i = 0; i < this.navButtons.length; i++) {
          var link = this.navButtons[i].getAttribute('routerLink');

          if(event.url.includes(link)) {
            this.navigateTo(this.navButtons[i]);
            return;
          }
      }
  });
  }

  ngOnInit(): void {
    this.slider = (document.getElementsByClassName("slider") as HTMLCollectionOf<HTMLDivElement>)[0];
    this.slider.hidden = true;
    this.slider.style.top = "-5px";
  }

  navigateTo(element : Element) {
    if(this.currentSelected != null) {
      this.currentSelected.classList.remove('selected');
    }
    if(this.slider.hidden) {
      this.slider.hidden = false;
    }

    element.classList.add('selected'); 
    this.slider.style.top = this.offset(element).top - 5 + "px";
    
    this.currentSelected = element;
  }

  offset(el) : any {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}


