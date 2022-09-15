import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { Rental } from '../model/rental';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { GlobalsService } from '../services/globals.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private notificationService: NotificationsService,private bookService:BookService, private globalsService: GlobalsService, private rentalServive: RentalService, private location: Location,private router:Router) { }
  
  errorMessage(err) {
    this.notificationService.error('Greska', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade'
    })
  }


  ngOnInit (): void {
    
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    
    enum allMonths {
        "Januar" = 1, 
        "Februar", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August",
        "September", 
        "October",
        "November", 
        "December" = 12
    };

    let acceptedYears: number[] = []
    let todayDate = new Date()

    let startYear = todayDate.getFullYear()-1
    let startMonth = todayDate.getMonth() + 1
    let endMonth = startMonth - 1
    
    let yearS = startYear

    acceptedYears.push(yearS)

    let longMonth = todayDate.toLocaleString('en-us', { month: 'long' });
    let monthEnum : allMonths = (<any>allMonths)[longMonth];
    
    
    this.allGenres = this.globalsService.allGenres
    this.numberOfBooksForGenres.length = this.allGenres.length

    this.firstChartData = []
    this.secondChartData = []

    let monthGraphMatrix: (string|number)[] [] = this.firstChartData
    let group: (string|number)[] [] = this.secondChartData

    for(let i = 0;i < 12; i++){
      monthGraphMatrix.push([allMonths[monthEnum].concat(" "+startYear.toString()), 0])
      monthEnum++
      if(monthEnum>12){
        monthEnum = 1
        startYear++
        let yearSNext = startYear
        acceptedYears.push(yearSNext)
      }
    }

    for(let i=0;i <this.numberOfBooksForGenres.length;i++){
      this.numberOfBooksForGenres[i]=0
      group.push([this.allGenres[i], this.numberOfBooksForGenres[i]])
    }
    
  
   

    this.bookService.getAllBooks().subscribe((books: Book[])=>{
     this.allBooks = books
      this.rentalServive.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
        this.allRentalsFromUser = rentals
        this.allRentalsFromUser.forEach(rental => {
          if(rental.active==false){
            //first chart
            let startDate = rental.startDate
            let da = new Date(startDate)
            
            let y = da.getFullYear()
            let longMo = da.toLocaleString('en-us', { month: 'long' });
            let monthEn : allMonths = (<any>allMonths)[longMo];
            
            if(acceptedYears.includes(y))
            if((y == acceptedYears[0] && startMonth<da.getMonth()+1) || (y == acceptedYears[1] && endMonth>=da.getMonth()+1))
            {
              
              let k = startMonth
              let ind = 0
              while(true){
                if(k==monthEn){
                  monthGraphMatrix[ind][1] = parseInt(monthGraphMatrix[ind][1].toString())+1
                  break;
                }
                k++
                if(k>12)k=1
                ind++
              }
            }
          }
        });
          
          //second chart
          this.allRentalsFromUser.forEach(rental => {
          if(rental.active == false){
            
            let b = this.allBooks.find(book=>book.id==rental.idB)
            
            b.genres.forEach(ge => {
              for(let j = 0; j<this.allGenres.length;j++){
                if(group[j][0] == ge) group[j][1] = parseInt(group[j][1].toString())+1
              }
            });
          }
          });
          
          this.firstChartData = monthGraphMatrix
          this.secondChartData = group
          this.isLoaded=true
      })
      
    })  
  }
 
  isLoaded=false
  allBooks: Book[] =[]
  user :User
  allRentalsFromUser: Rental[] = []
  allGenres: string[] = []
  numberOfBooksForGenres: number[] = []


  firstChartTitle = 'Poslednjih 12 meseci';
  firstChartType: ChartType = 'ColumnChart' as ChartType;
  firstChartData 
  firstChartOptions = {  
    vAxis: {viewWindowMode: "explicit", viewWindow:{ min: 0 }}  
  };

  secondChartTitle = "Po zanrovima"
  secondChartType : ChartType = 'PieChart' as ChartType;
  secondChartData 
  secondChartColumnNames = ['Zanr', 'BrojKnjiga'];
  secondChartOptions = {    
  };
  secondChartWidth = 550;
  secondChartHeight = 400;
 

  navigateToChangePasswordPage(){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    this.router.navigate(['changepassword'])
  }

  navigateToChangePersonalInformationsPage(){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    this.router.navigate(['changeperosnalinformations'])
  }
  canShowGraphs(){
    for(let i =0; i<this.secondChartData.length; i++){
      if(this.secondChartData[i][1]!=0)
      return true
    }
    return false
  }

  back(){
    this.location.back()
  }
}
