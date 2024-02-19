import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agri-processors',
  templateUrl: './agri-processors.component.html',
  styleUrls: ['./agri-processors.component.css']
})
export class AgriProcessorsComponent implements OnInit {
dataSource: any;
displayedColumns: any;
isLoading: any;
chartOptions1: any;
applyFilter($event: any) {
throw new Error('Method not implemented.');
}
refresh() {
throw new Error('Method not implemented.');
}

  constructor() { }

  ngOnInit(): void {
  }

}
