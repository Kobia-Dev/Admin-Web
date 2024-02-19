import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { DateTime } from 'ts-luxon';
import { SnackbarService } from '../../services/snackbar.service';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ValuechainService } from '../../services/valuechain.service';
import { switchMap } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  valueChains: any;
  services: any;
  expertises: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private snackbar: SnackbarService,
    private serviceProviderService: ServiceProviderService,
    private tokenStorage: TokenStorageService,
    private valueChainService: ValuechainService) { }

  onBoardServiceProviderForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ['', Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
    businessName: ['', Validators.required],
    businessEmail: ['', Validators.required],
    businessDescription: ['', Validators.required],
    businessPhone: ['', Validators.required],
    expertiseId: ['', Validators.required],
    licenceNo: ['', Validators.required],
    workingHourStart: ['', Validators.required],
    workingHoursStop: ['', Validators.required],
    workingDays: ['', Validators.required],
    valueChain: ['', Validators.required]

  });

  workingDaysList: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  maxTime: DateTime = DateTime.local().set({
    hour: 16,
  });
  minTime: DateTime = DateTime.local().set({
    hour: 14,
  });

  required: boolean = false;
  @ViewChild('timepicker') timepicker: any;
  @ViewChild('time') time: any;

  ngOnInit(): void {
    this.getAllValueChain();
    this.getExpertise();
  }

  // public getServices() {
  //   this.serviceProviderService.getAllServices().subscribe({
  //     next: ((res) => {
  //       console.log(res);
  //       this.services = res.entity;
  //       console.log("Services: ", this.services);
  //     }),
  //     error: ((error) => {
  //       console.log("Error fetching services", error);
  //     }),
  //     complete: () => { }
  //   })
  // }

  public getExpertise() {
    this.serviceProviderService.getExpertise().subscribe({
      next: ((res) => {
        this.expertises = res.entity;
        console.log("Expertises: ", this.expertises);
      }),
      error: ((error) => {
        console.log("Error fetcing expertise", error);
      }),
      complete: (() => { })
    })
  }
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

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.onBoardServiceProviderForm.get('workingHourStart')?.disabled) {
      timepicker.open();
    }
  }

  openIcon(time: { open: () => void }) {
    if (!this.onBoardServiceProviderForm.get('workingHourStop')?.disabled) {
      time.open();
    }
  }

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted data", this.onBoardServiceProviderForm.value);

    if (this.onBoardServiceProviderForm.invalid) {
      this.error = "Invalid data";
      return;
    } else {
      const regService = {
        firstName: this.onBoardServiceProviderForm.value.firstname,
        lastName: this.onBoardServiceProviderForm.value.lastname,
        email: this.onBoardServiceProviderForm.value.email,
        password: this.onBoardServiceProviderForm.value.password,
        phoneNo: this.onBoardServiceProviderForm.value.phoneNo,
        role: this.onBoardServiceProviderForm.value.role,
      };
      this.serviceProviderService.registerServiceProvider(regService).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {
            console.log("Registration response:", res)
            const userId = res.entity.id;
            console.log("UserId: ", userId);
            const updServiceProvider = {
              idNumber: this.onBoardServiceProviderForm.value.idNo,
              gender: this.onBoardServiceProviderForm.value.gender,
              businessName: this.onBoardServiceProviderForm.value.businessName,
              businessEmail: this.onBoardServiceProviderForm.value.businessEmail,
              businessDecription: this.onBoardServiceProviderForm.value.businessDescription,
              businessPhone: this.onBoardServiceProviderForm.value.businessPhone,
              licenseNumber: this.onBoardServiceProviderForm.value.licenceNo,
              valueChainId: this.onBoardServiceProviderForm.value.valueChain,
              expertiseId: this.onBoardServiceProviderForm.value.expertiseId,
              workingHours: {
                startHour: this.onBoardServiceProviderForm.value.workingHourStart,
                endHour: this.onBoardServiceProviderForm.value.workingHoursStop
              },
              workingDays: this.onBoardServiceProviderForm.value.workingDays,
            };
            console.log("Update data: ", updServiceProvider);
            const data = this.tokenStorage.getUser();
            let access_token = data.access_token;
            return this.serviceProviderService.updServiceProvider(userId, updServiceProvider, access_token);
          } else {
            console.log("Registration failed: ", res);
            return [];
          }
        })
      ).subscribe({
        next: (res) => {
          if (res && res.statusCode == 200){
            console.log("Update res " , res)
            this.snackbar.showNotification("snackbar-message", "Registarion successful");
            this.dialogRef.close();
          }
        },
        error: (error) => {
          console.log("Error updating", error);
          this.snackbar.showNotification("snackbar-message", "Registration Failed");
        },
        complete: () => {}
      })
    }
  }
  onClear($event: Event) {
    this.onBoardServiceProviderForm.get('workingHourStart')?.setValue(null);
  }
  clear($event: Event) {
    this.onBoardServiceProviderForm.get('workingHoursStop')?.setValue(null);
  }
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  onClick(): void {
    this.dialogRef.close();
  }
}
