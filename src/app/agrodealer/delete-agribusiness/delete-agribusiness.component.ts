import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgriBusinessComponent } from '../agri-business/agri-business.component';
import { AgribusinessService } from 'src/app/admin/services/agribusiness.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/admin/services/snackbar.service';
import { DataService } from 'src/app/market-place/services/data.service';

@Component({
  selector: 'app-delete-agribusiness',
  templateUrl: './delete-agribusiness.component.html',
  styleUrls: ['./delete-agribusiness.component.css']
})
export class DeleteAgribusinessComponent implements OnInit {
  rowData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgriBusinessComponent>,
    private agribusinessService: AgribusinessService,
    private tokenStorageService: TokenStorageService,
    private snackbar: SnackbarService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
  }

  public onDelete() {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
    const data = this.tokenStorageService.getUser();
    const accessToken = data.access_token;
    this.agribusinessService.deleteAgribusiness(this.rowData.id, accessToken).subscribe({
      next: ((res) => {
        if (res.statusCode === 204){
          this.dialogRef.close();
          this.snackbar.showNotification("snackbar-message", "Agribusiness deleted successfully");
          this.dataService.updateData();
        }
        else{
          this.snackbar.showNotification("snackbar-warn", res.message);
        }
      }),
      error: ((error) => {
        this.snackbar.showNotification("snackbar-warn", error);
      }),
      complete: (() => {})
    })
  }

  public onCancel() {
    this.dialogRef.close();
  }

}
