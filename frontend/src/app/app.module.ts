import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminComponent } from './admin/admin.component';
import { ReaderComponent } from './reader/reader.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfileComponent } from './profile/profile.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RentedbooksComponent } from './rentedbooks/rentedbooks.component';
import { RenthistoryComponent } from './renthistory/renthistory.component';
import { CommentpageComponent } from './commentpage/commentpage.component';
import { AddbookComponent } from './addbook/addbook.component';
import { GlobalsService } from './services/globals.service';
import { ChangebookinformationsComponent } from './changebookinformations/changebookinformations.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ChangeuserinformationsComponent } from './changeuserinformations/changeuserinformations.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChangepersonalinformationsComponent } from './changepersonalinformations/changepersonalinformations.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookrequestsComponent } from './bookrequests/bookrequests.component';
import { ChangecommentComponent } from './changecomment/changecomment.component';
import { ChangerentdaysComponent } from './changerentdays/changerentdays.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AdminloginComponent,
    AdminComponent,
    ReaderComponent,
    ChangepasswordComponent,
    ProfileComponent,
    BookdetailsComponent,
    SearchbooksComponent,
    RentedbooksComponent,
    RenthistoryComponent,
    CommentpageComponent,
    AddbookComponent,
    ChangebookinformationsComponent,
    AdduserComponent,
    ChangeuserinformationsComponent,
    ChangepersonalinformationsComponent,
    BookrequestsComponent,
    ChangecommentComponent,
    ChangerentdaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    SimpleNotificationsModule.forRoot(),
    NgbModule
  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
  
})
export class AppModule { }
