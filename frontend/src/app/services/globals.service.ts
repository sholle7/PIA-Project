import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  constructor() { }

  public daysRent : number = 14
  public readonly allGenres = ["drama", "komedija", "akcija", "horor", "misterija", "naucna fantastika"]
}
