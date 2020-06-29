import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from 'src/app/_services/auction.service';
import { AuctionItem } from 'src/app/_models/auctionItem.model';
import { MyErrorStateMatcher } from 'src/app/_errorMatcher/default.error-matcher';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.sass']
})
export class AuctionFormComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredCategories: Observable<Category[]>;
  categories: Category[] = [];
  allCategories: Category[] = [
  ];

  images : FormData;
  submitted = false;
  auctionForm: FormGroup;
  mindate: Moment;

  media = [];

  types = [
    "Fast",
    "Normal"
  ];

  matcher = new MyErrorStateMatcher();

  @ViewChild('catInput') catInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private auctionService : AuctionService,
    private categoriesService : CategoryService,
    private snackBar : MatSnackBar,
    private router: Router
    ) { 
    this.mindate = moment();

    this.initMedia();
    this.fetchCategories();
  }

  ngOnInit(): void {
    this.initForm();
  }

  return() {
    this._location.back();
  }

  fetchCategories() {
    this.categoriesService.getAll()
    .then(categories => {
        console.log(categories);
        this.allCategories = categories;
        this.initChips();
    });
  }

  initMedia() {
    this.images = new FormData();
    for(var i = 0; i < 9; i++) {
      this.media.push({
        loaded : false,
        src : '../../../assets/backgrounds/placeholder.jpg'
      })
    }
  }

//#region Form

initForm() {
  this.auctionForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    startPrice: [1, Validators.required],
    priceStep: [1, Validators.required],
    type : [this.types[1], Validators.required],
    time : [ 
      {
        startDate: moment(),
        endDate: moment()
      }, Validators.required
    ],
    categories: []
  });
}

onSubmit() {
  this.submitted = true;

  if(this.auctionForm.valid) {
    this.auctionService.create(
            new AuctionItem(
                this.f.title.value,
                this.f.description.value,
                this.f.priceStep.value,
                this.f.startPrice.value,
                this.f.time.value.startDate,
                this.f.time.value.endDate,
                this.categories,
                this.f.type.value),
                this.images
        )
        .subscribe((auction : AuctionItem) => {
          console.log(auction);
          this.router.navigate(['/auction/' + auction.id]);
        })
  }

  console.log(this.auctionForm);
}

get f() { 
  return this.auctionForm.controls; 
}

//#endregion

//#region images

addImage(fileInput: any){
  if (fileInput.target.files && fileInput.target.files[0]) {

    var reader = new FileReader();
    var current = this.media.find(a => a.loaded == false);
    reader.onload = function (e : any) {
      current.src = e.target.result;
      current.loaded = true;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
    this.images.append('files', fileInput.target.files[0], fileInput.target.files[0].name);
  }
}

imageDrop(event: CdkDragDrop<string[]>) {
  // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  let oldtarget = this.media[event.previousIndex];
  this.media[event.previousIndex] = this.media[event.currentIndex];
  this.media[event.currentIndex] = oldtarget;
}

//#endregion

//#region Chips

visible = true;
selectable = true;
removable = true;

initChips() {
  this.filteredCategories = this.f.categories.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCategories.slice()));
}

add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add our category
  if ((value || '').trim()) {
    var category = this.allCategories.find(a => a.name == value.trim());
    if(category != null) {
      this.categories.push(category);
    }
    else {
      let snackBarRef = this.snackBar.open(`Category with name ${value.trim()} not found`, 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 2000,
      });
    }
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }

  this.f.categories.setValue(null);
}

remove(category: Category): void {
  const index = this.categories.indexOf(category);

  if (index >= 0) {
    this.categories.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  var category = this.allCategories.find(a=> a.name === event.option.viewValue);

  this.categories.push(category);
  this.catInput.nativeElement.value = '';
  this.f.categories.setValue(null);
}

private _filter(value: string): Category[] {
  const filterValue = value.toLowerCase();

  return this.allCategories.filter(category => category.name.toLowerCase().indexOf(filterValue) === 0);
}

//#endregion
}
