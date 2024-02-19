import { Component } from '@angular/core';
import { Router } from '@angular/router'; '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/admin/services/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // destroy$: Subject<boolean> = new Subject<boolean>();
  // currentUser: any;


  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }

  // constructor(
  //   private router: Router,
  //   private tokenStorage: TokenStorageService,
  //   private dialog: MatDialog,
  //   private adminservice: AdminService,
  //   private snackbar: SnackbarService) { }

  // onValuechainClick() { 
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(ValueChainComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/valueChain-onboarding"]);
  // }

  // onFarmerClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(FarmerOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/farmer-onboarding"]);
  // }
  // onManufacturerClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(ManufacturerComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/manufacturer-onboarding"]);
  // }
  // onStaffClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(StaffOnboardingComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });
  //   this.router.navigate(["/onboarding/staff-onboarding"])
  // }
  // onAgribusinessClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(AgribusinessOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/agribusiness-onboarding"])
  // }
  // onCustomerClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(CustomerOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/customer-onboarding"])
  // }
  // onDriverClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(DriverOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/driver-onboarding"])
  // }
  // onWarehouseClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(WarehouseOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/warehouse-onboarding"])
  // }
  // onServiceProviderClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(ServiceProviderComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/serviceProvider-onboarding"]);
  // }
  // onAdminClick() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '600px'
  //   dialogConfig.data = { test: "data" }

  //   const dialogRef = this.dialog.open(AdminOnboardingComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('closed');
  //   });

  //   this.router.navigate(["/onboarding/admin-onboarding"]);
  // }
  // onSubmit() {

  // }

  // logout() {

  //   const data = this.tokenStorage.getUser();
  //   let logoutBdy = {
  //     "accessToken": data.access_token
  //   };
  //   this.adminservice.logoutAdmin(logoutBdy).pipe(takeUntil(this.destroy$)).subscribe({
  //     next: ((res) => {
  //       if (res.statusCode === 200) {
  //         this.snackbar.showNotification("snackbar-warn", res.message);
  //         this.tokenStorage.signOut();
  //         this.router.navigate(["/authentication/login"]);
  //       }
  //     }),

  //     error: ((error) => {
  //       console.log(error.message);
  //     }),

  //     complete: (() => { })
  //   });
  // }
}