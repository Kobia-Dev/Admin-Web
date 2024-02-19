import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgriBusinessComponent } from '../agri-business/agri-business.component';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/admin/services/snackbar.service';
import { DataService } from 'src/app/market-place/services/data.service';

@Component({
  selector: 'app-deactivate-agribusiness',
  templateUrl: './deactivate-agribusiness.component.html',
  styleUrls: ['./deactivate-agribusiness.component.css']
})
export class DeactivateAgribusinessComponent implements OnInit {
  rowData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgriBusinessComponent>,
    private tokenStorageService: TokenStorageService,
    private snackbar: SnackbarService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
  }

  public onDeactivate() {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
    const data = this.tokenStorageService.getUser();
    // const accessToken = data.access_token;
    
    // Commenting out the API call while waiting for the backend API
    // this.agribusinessService.deactivateAgribusiness(this.rowData.id, accessToken).subscribe({
    //   next: ((res) => {
    //     if (res.statusCode === 200) {
    //       this.dialogRef.close('deactivateConfirmed');
    //       this.snackbar.showNotification("snackbar-message", "Agribusiness deactivated successfully");
    //       this.dataService.updateData();
    //     } else {
    //       this.snackbar.showNotification("snackbar-warn", res.message);
    //     }
    //   }),
    //   error: ((error) => {
    //     this.snackbar.showNotification("snackbar-warn", error);
    //   }),
    //   complete: (() => {})
    // });

    // Temporary response to simulate a successful deactivation
    // Remove this and uncomment the actual API call when ready
    this.dialogRef.close('deactivateConfirmed');
    this.snackbar.showNotification("snackbar-message", "Agribusiness deactivated successfully");
    this.dataService.updateData();
  }

  public onCancel() {
    this.dialogRef.close();
  }

}
