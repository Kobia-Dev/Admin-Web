import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgriBusinessComponent } from '../agri-business/agri-business.component';

@Component({
  selector: 'app-view-agribusiness',
  templateUrl: './view-agribusiness.component.html',
  styleUrls: ['./view-agribusiness.component.css']
})
export class ViewAgribusinessComponent implements OnInit {
  rowData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgriBusinessComponent>) { }

  ngOnInit(): void {
    this.rowData = this.data.rowData;
  }
}
