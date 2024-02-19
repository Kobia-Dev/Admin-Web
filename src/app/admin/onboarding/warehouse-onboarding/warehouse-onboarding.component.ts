import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { DateTime } from 'ts-luxon';
import { SnackbarService } from '../../services/snackbar.service';
import { WarehouseService } from '../../services/warehouse.service';
import { switchMap } from 'rxjs';
import { ValuechainService } from '../../services/valuechain.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-warehouse-onboarding',
  templateUrl: './warehouse-onboarding.component.html',
  styleUrls: ['./warehouse-onboarding.component.css']
})
export class WarehouseOnboardingComponent implements OnInit {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  destroy$: any;
  valueChains: any;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private warehouseService: WarehouseService,
    private valueChainService: ValuechainService) {
  }

  onBoardWarehouseForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
    licenceNo: ['', Validators.required],
    warehouseName: ['', Validators.required],
    warehouseEmail: ['', Validators.required],
    warehousePhone: ['', Validators.required],
    warehouseDescr: ['', Validators.required],
    valueChain: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getAllValueChain();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  required: boolean = false;

  public getAllValueChain() {
    this.valueChainService.getValueChain().subscribe({
      next: ((res) => {
        console.log(res);
        this.valueChains = res.entity;
        console.log("Value Chains", this.valueChains)
      }),
      error: ((error) => {
        console.log("Error fetchin value chains", error);
      }),
      complete: () => { }
    });
  }

  onClear($event: Event) {
    this.onBoardWarehouseForm.get('workingHourStart')?.setValue(null);
  }
  clear($event: Event) {
    this.onBoardWarehouseForm.get('workingHourStop')?.setValue(null);
  }

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted data", this.onBoardWarehouseForm.value);

    if (this.onBoardWarehouseForm.invalid) {
      this.error = "Invalid data";
      return;
    } else {
      const regWarehouse = {
        firstName: this.onBoardWarehouseForm.value.firstname,
        lastName: this.onBoardWarehouseForm.value.lastname,
        email: this.onBoardWarehouseForm.value.email,
        password: this.onBoardWarehouseForm.value.password,
        phoneNo: this.onBoardWarehouseForm.value.phoneNo,
        role: this.onBoardWarehouseForm.value.role,
      };
      this.warehouseService.addWarehouse(regWarehouse).pipe(
        switchMap((res) => {
          console.log("Registering warehouse");
          if (res["statusCode"] == 201) {
            console.log("Registration response:", res);
            const userId = res.entity.id;
            console.log("Warehouse ID", userId);
            const updWarehouse = {
              user: {
              },
              idNumber: this.onBoardWarehouseForm.value.idNo,
              gender: this.onBoardWarehouseForm.value.gender,
              licenceNumber: this.onBoardWarehouseForm.value.licenceNo,
              warehouseName: this.onBoardWarehouseForm.value.warehouseName,
              warehouseEmail: this.onBoardWarehouseForm.value.warehouseEmail,
              warehousePhoneNumber: this.onBoardWarehouseForm.value.warehousePhone,
              warehouseDescription: this.onBoardWarehouseForm.value.warehouseDescr,
              valueChainId: this.onBoardWarehouseForm.value.valueChain
            };
            console.log("Update data", updWarehouse);
            const data = this.tokenStorage.getUser();
            let access_token = data.access_token;
            return this.warehouseService.updWarehouse(userId, updWarehouse, access_token);
          } else {
            console.log("Registration failed", res);
            return [];
          }
        })
      ).subscribe({
        next: ((res) => {
          if (res && res.statusCode == 200) {
            console.log("Update res: ", res);
            this.snackbar.showNotification("snackbar-message", "Warehouse Registration successfully");
            this.dialogRef.close();
          }
        }),
        error: ((error) => {
          this.snackbar.showNotification("snackbar-message", "Registration Failed");
          console.log("Error in subscribe:", error)
        }),
        complete: () => { }
      })
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
