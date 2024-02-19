import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { AdminService } from '../../services/admin.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { Subject, switchMap } from "rxjs";
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-admin-onboarding',
  templateUrl: './admin-onboarding.component.html',
  styleUrls: ['./admin-onboarding.component.css']
})
export class AdminOnboardingComponent implements OnInit {

  selectedFile!: File;
  base64String!: string;
  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  base64Image: any;
  userId!: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idNo: any;
  updateGender: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<RegisterComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  adminForm: FormGroup = this.formBuilder.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ["", Validators.required],
    role: ["", Validators.required],
    idNo: ["", Validators.required],
    gender: ["", Validators.required],
    // img: ['', Validators.required],
  });

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted form", this.adminForm.value);

    if (this.adminForm.invalid) {
      this.error = "Invalid data !";
      return;
    } else {
      const regAdmin = {
        firstName: this.adminForm.value.firstname,
        lastName: this.adminForm.value.lastname,
        email: this.adminForm.value.email,
        password: this.adminForm.value.password,
        phoneNo: this.adminForm.value.phoneNo,
        role: this.adminForm.value.role,
      };
      this.idNo = this.adminForm.get('idNo')?.value;
      this.updateGender = this.adminForm.get('gender')?.value;

      this.adminService.registerAdmin(regAdmin).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {

            console.log("Registration response:", res.entity)
            const userId = res.entity.id;
            console.log("Admin id:", userId);
            const updAdmin = {
              idNumber: this.idNo,
              gender: this.updateGender,
            };
            console.log("Update Data:", updAdmin);
            //Get user's access_token
            const data = this.tokenStorage.getUser();
            let access_token = data.access_token;
            //UpdateAdmin
            return this.adminService.updateAdmin(userId, updAdmin, access_token);
          } else {
            console.log("Registration failed. Response:", res);
            return [];
          }
        })
      ).subscribe({
        next: (res) => {
          if (res && res.statusCode === 200) {
            console.log("Update res:", res);
            this.snackbar.showNotification("snackbar-message", "Admin registered succesfully");
            this.dialogRef.close();
          } else {
            console.log("Update failed");
            this.snackbar.showNotification("snackbar-message", "Admin registration failed");
          }
        },
        error: (error) => {
          console.log("Error in subscribe:", error);
        },
        complete: () => { }
      });
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  // onSelectedFile(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   this.convertToBase64(this.selectedFile).then((base64String) => {
  //     console.log('Base64 String:', base64String);
  //   });
  // }

  // async convertImageToBase64() {
  //   if (this.selectedFile) {
  //     try {
  //       this.base64String = await this.convertToBase64(this.selectedFile);
  //       console.log("Image base64:", this.base64String);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log("No image selected");
  //   }
  // }

  // async convertToBase64(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       resolve(reader.result as string);
  //       this.base64Image = reader.result;
  //       this.adminForm.controls['img'].setValue(this.base64Image);
  //       console.log("Image value", this.adminForm.controls['img'].value);
  //     };

  //     reader.onerror = () => {
  //       reject('Error occurred while reading the file.');
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // }
}