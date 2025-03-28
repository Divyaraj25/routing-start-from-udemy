import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  errorMessage:string;
  constructor(private route:ActivatedRoute) {
   
  }
  ngOnInit(){
    this.route.snapshot.data['message']
    this.route.data.subscribe(
      (data:Data)=>{
        this.errorMessage = data['message'];
      }
    )
  }
}
