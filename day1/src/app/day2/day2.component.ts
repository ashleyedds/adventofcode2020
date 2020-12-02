import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day2',
  templateUrl: './day2.component.html',
  styleUrls: ['./day2.component.css']
})
export class Day2Component implements OnInit {

  totalCount = 0;
  totalCountTwo = 0;
  passwords = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.parseFile();
  }

  parseFile() {
    return this.http.get('../../assets/input2.txt', { responseType: 'text' })
      .subscribe(data => {
        this.passwords = (data.split(/[\r\n]+/));
        this.partOne();
        this.partTwo();
      });
  }

  partOne() {
    this.passwords.forEach(p => {
      const ruleLowerBoundary = parseInt(p.split(': ')[0].split(' ')[0].split('-')[0], 10);
      const ruleUpperBoundary = parseInt(p.split(': ')[0].split(' ')[0].split('-')[1], 10);
      const letter = p.split(': ')[0].split(' ')[1];
      const password = p.split(': ')[1];
      let letterCount = 0;
      for (let position = 0; position < password.length; position++) {
        if (password.charAt(position) === letter) {
          letterCount++;
        }
      }
      if (letterCount >= ruleLowerBoundary && letterCount <= ruleUpperBoundary) {
        this.totalCount++;
      }
    });
  }

  partTwo() {
    this.passwords.forEach(p => {
      const ruleLowerBoundary = parseInt(p.split(': ')[0].split(' ')[0].split('-')[0], 10);
      const ruleUpperBoundary = parseInt(p.split(': ')[0].split(' ')[0].split('-')[1], 10);
      const letter = p.split(': ')[0].split(' ')[1];
      const password = p.split(': ')[1];
      console.log(ruleLowerBoundary);
      console.log(ruleUpperBoundary);
      console.log(password);
      console.log(password.charAt(ruleLowerBoundary - 1));
      if ((password.charAt(ruleLowerBoundary - 1) === letter && password.charAt(ruleUpperBoundary - 1) !== letter)
        || (password.charAt(ruleUpperBoundary - 1) === letter && password.charAt(ruleLowerBoundary - 1) !== letter)) {
        this.totalCountTwo++;
      }
    });
  }

}
