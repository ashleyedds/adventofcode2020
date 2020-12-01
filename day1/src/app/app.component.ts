import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'day1';
  numbers = [];
  magicNums = [];

  multNum;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFileContents();
  }

  // tslint:disable-next-line: typedef
  getFileContents() {
    return this.http.get('assets/input.txt', { responseType: 'text' })
    .subscribe(data => {
      const arrayofNums = data.split(/[\r\n]+/).map(num => Number(num));
      this.findNums(arrayofNums);
    });
  }

  findNums(array) {
    array.flatMap(
      (v, i) => array.slice(i + 1).map( w =>
        {
          if ( v + w === 2020) {
            this.magicNums.push(v, w);
            this.multNum = v * w;
          }
        })
    );
}
