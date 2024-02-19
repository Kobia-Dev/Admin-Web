import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { DriverService } from '../../services/driver.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { DriversComponent } from 'src/app/driver/drivers/drivers.component';

@Component({
  selector: 'app-driver-onboarding',
  templateUrl: './driver-onboarding.component.html',
  styleUrls: ['./driver-onboarding.component.css']
})
export class DriverOnboardingComponent {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";

  constructor(
    public dialogRef: MatDialogRef<DriversComponent>,
    private formBuilder: FormBuilder,
    private driverService: DriverService,
    private tokenStorage: TokenStorageService) { }

  onBoardDriverForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
    licenceNo: ['', Validators.required],
    modeofTransport: ['', Validators.required],
    numberPlate: ['', Validators.required]
  });

  submit() {
    // this.submitted = true;
    // this.loading = true;
    // this.error = "";
    // console.log("Submitted data", this.onBoardDriverForm.value);

    // if (this.onBoardDriverForm.invalid) {
    //   this.error = "Invalid data";
    //   return;
    // } else{
    //   const regDriver = {
    //     firstName: this.onBoardDriverForm.value.firstname,
    //     lastName: this.onBoardDriverForm.value.lastname,
    //     email: this.onBoardDriverForm.value.email,
    //     password: this.onBoardDriverForm.value.password,
    //     phoneNo: this.onBoardDriverForm.value.phoneNo,
    //     role: this.onBoardDriverForm.value.role,
    //   };
    //   this.driverService.registerDriver
    // }
   }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
