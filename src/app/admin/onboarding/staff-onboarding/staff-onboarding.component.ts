import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { SnackbarService } from '../../services/snackbar.service';
import { StaffService } from '../../services/staff.service';
import { switchMap } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-staff-onboarding',
  templateUrl: './staff-onboarding.component.html',
  styleUrls: ['./staff-onboarding.component.css']
})
export class StaffOnboardingComponent {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private tokenStorage: TokenStorageService,
    private snackbar: SnackbarService,
    private staffService: StaffService) { }

  onBoardStaffForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ['', Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
  });

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted data", this.onBoardStaffForm.value);

    if (this.onBoardStaffForm.invalid) {
      this.error = "Invalid data";
      return;
    } else {
      const regStaff = {
        firstName: this.onBoardStaffForm.value.firstname,
        lastName: this.onBoardStaffForm.value.lastname,
        email: this.onBoardStaffForm.value.email,
        password: this.onBoardStaffForm.value.password,
        phoneNo: this.onBoardStaffForm.value.phoneNo,
        role: this.onBoardStaffForm.value.role,
      };
      this.staffService.registerStaff(regStaff).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {
            console.log("Registration response:", res)
            this.snackbar.showNotification("snackbar-message", "Registarion successful");

            const userId = res.entity.id;
            console.log("Staff Id: ", userId);
            const updStaff = {
              user: {
              },
              idNumber: this.onBoardStaffForm.value.idNo,
              gender: this.onBoardStaffForm.value.gender
            };
            console.log("Update data: ", updStaff);
            const data = this.tokenStorage.getUser();
            let access_token = data.access_token;
            return this.staffService.updateStaff(userId, updStaff, access_token);
          } else {
            console.log("Registration failed", res);
            return [];
          }
        })
      ).subscribe({
        next: ((res) => {
          if (res && res.statusCode == 200) {
            console.log("Update res: ", res);
            this.snackbar.showNotification("snackbar-message", "Staff updated successfully");
            this.dialogRef.close();
          } else {
            console.log("Update failed", res);
            this.snackbar.showNotification("snackbar-message", "Registration Failed");
          }
        }),
        error: ((error) => {
          console.log("Error in subscribe:", error)
        }),
        complete: (() => { })
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