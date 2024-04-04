import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    // this will update url and content when user navigates to this url
    // this is compulsory to unscribe from the observable, otherwise it will be a memory leak
    // not for this because this params observable will be destroyed when the component is destroyed, here angular do that automatically
    // but in case of homemade observables, we have to do it manually, in ngOnDestroy
    this.route.params.subscribe(
      (params:Params)=>{
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
