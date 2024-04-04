import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: { id: number, name: string, status: string }[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // navigate property doesnt know the url, so it will not reload, it will simply redirect to that route
    // this.router.navigate(['/servers']) // => gives /servers page, but when it is on that page, it will not reload
    // this.router.navigate(['servers']) // => gives /servers page, but when it is on that page, it will not reload
    this.router.navigate(['/servers'], { relativeTo: this.route }) // this will tell the navigate property that the button is in this path
  }
}
