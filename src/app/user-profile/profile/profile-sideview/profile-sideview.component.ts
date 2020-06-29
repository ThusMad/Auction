import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { UploadService } from 'src/app/_services/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-sideview',
  templateUrl: './profile-sideview.component.html',
  styleUrls: ['./profile-sideview.component.sass']
})
export class ProfileSideviewComponent implements OnInit {
  role: string;
  user: User;
  profilePic : {
    src : string,
    isLoaded: boolean 
  } = {
    src : "", 
    isLoaded : false
  };
  image : FormData;
  @Input() userId = "";

  constructor(private snackBar : MatSnackBar,
    private auth : AuthenticationService,
    private userService : UserService,
    private router: Router,
    private uploadService: UploadService,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    this.image = new FormData();

    this.userService.getRole().subscribe(role => {
      this.role = role.replace(/['"]+/g, '');
    })
    if(this.userId == "") {
      var current = sessionStorage.getItem('currentUser');
      if(current === null) {
        this.userService.get(this.userId).subscribe(user => {
          this.user = user;
          this.profilePic.src = user.profilePicture;
        })
      }
      else {
        console.log(current);
        this.user = JSON.parse(current) as User;
        this.profilePic.src = this.user.profilePicture;
        console.log(this.user);
      }
    }
    else {
      this.userService.get(this.userId).subscribe(user => {
        this.user = user;
        this.profilePic.src = user.profilePicture;
      })
    }
  }

  out() : void {
    let snackBarRef = this.snackBar.open('logout', 'OK', {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000,
    });

    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  saveImage() : void {
    this.uploadService.addProfilePicture(this.image)
    .subscribe( result => {
      this.user.profilePicture = result;
      this.profilePic.src = result;
      this.profilePic.isLoaded = false;
      }
    )
  }

  discardImage() : void {
    this.profilePic.src = this.user.profilePicture;
    this.profilePic.isLoaded = false;
  }

  addImage(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
  
      var reader = new FileReader();
      var current = this.profilePic;
      
      reader.onload = function (e : any) {
        current.src = e.target.result;
        current.isLoaded = true;
      }
  
      reader.readAsDataURL(fileInput.target.files[0]);
        this.image.append('file', fileInput.target.files[0], fileInput.target.files[0].name)
    }
  }

}
