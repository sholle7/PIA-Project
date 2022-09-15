import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BookrequestsComponent } from './bookrequests/bookrequests.component';
import { ChangebookinformationsComponent } from './changebookinformations/changebookinformations.component';
import { ChangecommentComponent } from './changecomment/changecomment.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangepersonalinformationsComponent } from './changepersonalinformations/changepersonalinformations.component';
import { ChangerentdaysComponent } from './changerentdays/changerentdays.component';
import { ChangeuserinformationsComponent } from './changeuserinformations/changeuserinformations.component';
import { CommentpageComponent } from './commentpage/commentpage.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminormoderatorGuard } from './guards/adminormoderator.guard';
import { LoggedGuard } from './guards/logged.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { ReaderGuard } from './guards/reader.guard';
import { WrongcomponentGuard } from './guards/wrongcomponent.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { Book } from './model/book';
import { ProfileComponent } from './profile/profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { RentedbooksComponent } from './rentedbooks/rentedbooks.component';
import { RenthistoryComponent } from './renthistory/renthistory.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';

const routes: Routes = [
  {path: "", component: HomepageComponent, canActivate:[WrongcomponentGuard]},
  {path: "homepage", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "adminlogin", component: AdminloginComponent},
  {path: "register", component: RegisterComponent},
  {path: "reader", component: ReaderComponent, canActivate: [ReaderGuard]},
  {path: "admin", component: AdminComponent, canActivate: [AdminGuard]},
  {path: "changepassword", component: ChangepasswordComponent, canActivate: [LoggedGuard]},
  {path: "profile", component: ProfileComponent,canActivate: [LoggedGuard] },
  {path: "bookdetails", component: BookdetailsComponent, canActivate: [ReaderGuard]},
  {path: "searchbooks", component: SearchbooksComponent},
  {path: "rentedbooks", component:RentedbooksComponent, canActivate: [ReaderGuard]},
  {path: "renthistory", component:RenthistoryComponent, canActivate: [ReaderGuard]},
  {path:"commentpage", component:CommentpageComponent, canActivate: [ReaderGuard]},
  {path:"addbook", component:AddbookComponent, canActivate: [LoggedGuard]},
  {path:"changebookinformations", component:ChangebookinformationsComponent, canActivate: [AdminormoderatorGuard]},
  {path:"adduser", component:AdduserComponent, canActivate:[AdminGuard]},
  {path:"changeuserinformations", component:ChangeuserinformationsComponent, canActivate:[AdminGuard]},
  {path:"changeperosnalinformations", component:ChangepersonalinformationsComponent, canActivate:[LoggedGuard]},
  {path:"bookrequests", component:BookrequestsComponent, canActivate:[ModeratorGuard]},
  {path:"changecomment",component:ChangecommentComponent, canActivate:[ReaderGuard]},
  {path:"changerentdays", component:ChangerentdaysComponent, canActivate:[AdminGuard]},
  {path: "**", component: HomepageComponent, redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
