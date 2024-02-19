import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { CustomerService } from '../../services/customer.service';
import { map, of, switchMap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-customer-onboarding',
  templateUrl: './customer-onboarding.component.html',
  styleUrls: ['./customer-onboarding.component.css']
})
export class CustomerOnboardingComponent {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private customerService: CustomerService,
    private tokenStorage: TokenStorageService,
    private snackbar: SnackbarService) { }

  onCustomerOnboardForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required]
  })

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";

    console.log("Submitted form", this.onCustomerOnboardForm.value);
    if (this.onCustomerOnboardForm.invalid) {
      this.error = "Invalid data!";
      return;
    } else {
      const regCustomer = {
        firstName: this.onCustomerOnboardForm.value.firstname,
        lastName: this.onCustomerOnboardForm.value.lastname,
        email: this.onCustomerOnboardForm.value.email,
        password: this.onCustomerOnboardForm.value.password,
        phoneNo: this.onCustomerOnboardForm.value.phoneNo,
        role: this.onCustomerOnboardForm.value.role,
        gender: this.onCustomerOnboardForm.value.gender,
      };

      console.log("Registration data", regCustomer);
      this.customerService.addCustomer(regCustomer).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {
            console.log("Registration response", res.entity);
            const userId = res.entity.id;
            console.log("UserId", userId);
            const updCustomer = {
              idNumber: this.onCustomerOnboardForm.value.idNo,
              gender: this.onCustomerOnboardForm.value.gender
            }
            console.log("Update data: ", updCustomer);
            const data = this.tokenStorage.getUser();
            let access_token = data.access_token;
            return this.customerService.updCustomer(userId, updCustomer, access_token);
          } else {
            console.log("Registration failed: ", res);
            return [];
          }
        })
      ).subscribe({
        next: (res) => {
          if (res && res.statusCode == 200) {
            console.log("Update res: ", res);
            this.snackbar.showNotification("snackbar-message", "Customer registerd successfully");
            this.dialogRef.close();
          } else {
            this.snackbar.showNotification("snackbar-message", "Customer registration failed");
            console.log("Update failed", res);
          }
        },
        error: (error) => {
          console.log("Error in subscribe:", error);
        },
        complete: () => { }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
