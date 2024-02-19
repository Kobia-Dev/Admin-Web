import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { DateTime } from 'ts-luxon';
import { AgribusinessService } from '../../services/agribusiness.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ValuechainService } from '../../services/valuechain.service';
import { Subject, switchMap } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-agribusiness-onboarding',
  templateUrl: './agribusiness-onboarding.component.html',
  styleUrls: ['./agribusiness-onboarding.component.css']
})

export class AgribusinessOnboardingComponent implements OnInit {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  businesses: any;
  valueChains: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private agriService: AgribusinessService,
    private snackbar: SnackbarService,
    private valueChainService: ValuechainService) { }

  onAgribusinessForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
    licenceNo: ['', Validators.required],
    agriName: ['', Validators.required],
    agriMail: ['', Validators.required],
    agriPhone: ['', Validators.required],
    agriDescr: ['', Validators.required],
    workingHourStart: ['', Validators.required],
    workingHourStop: ['', Validators.required],
    workingDays: ['', Validators.required],
    valueChain: ['', Validators.required],
    businessId: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getAllBusiness();
    this.getAllValueChain();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

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

  public getAllBusiness() {
    this.agriService.getBusiness().subscribe({
      next: ((res) => {
        this.businesses = res.entity;
        console.log("Businesses", this.businesses);
      }),
      error: ((error) => {
        console.log("Erroe fetching business", error)
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
        console.log("Error fetching value chains", error);
      }),
      complete: () => { }
    });
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.onAgribusinessForm.get('workingHourStart')?.disabled) {
      timepicker.open();
    }
  }

  openIcon(time: { open: () => void }) {
    if (!this.onAgribusinessForm.get('workingHourStop')?.disabled) {
      time.open();
    }
  }

  onClear($event: Event) {
    this.onAgribusinessForm.get('workingHourStart')?.setValue(null);
  }
  clear($event: Event) {
    this.onAgribusinessForm.get('workingHourStop')?.setValue(null);
  }

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted data", this.onAgribusinessForm.value);

    if (this.onAgribusinessForm.invalid) {
      this.error = "Invalid data";
      return;
    } else {
      const regAgri = {
        firstName: this.onAgribusinessForm.value.firstname,
        lastName: this.onAgribusinessForm.value.lastname,
        email: this.onAgribusinessForm.value.email,
        password: this.onAgribusinessForm.value.password,
        phoneNo: this.onAgribusinessForm.value.phoneNo,
        role: this.onAgribusinessForm.value.role,
      };
      this.agriService.registerAgribusiness(regAgri).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {
            console.log("Registartion response:", res);
            const userId = res.entity.id;
            const updAgri = {
              idNumber: this.onAgribusinessForm.value.idNo,
              gender: this.onAgribusinessForm.value.gender,
              businessName: this.onAgribusinessForm.value.agriName,
              businessEmail: this.onAgribusinessForm.value.agriMail,
              businessDescription: this.onAgribusinessForm.value.agriDescr,
              businessPhone: this.onAgribusinessForm.value.agriPhone,
              typeOfBusinessId: this.onAgribusinessForm.value.businessId,
              licenseNumber: this.onAgribusinessForm.value.licenceNo,
              workingHours: {
                startHour: this.onAgribusinessForm.value.workingHourStart,
                endHour: this.onAgribusinessForm.value.workingHourStop
              },
              workingDays: this.onAgribusinessForm.value.workingDays,
              valueChainId: this.onAgribusinessForm.value.valueChain
            };
            console.log("Update data", updAgri);
            const data = this.tokenStorage.getUser();
            let access = data.access_token;
            return this.agriService.updateAgribusiness(userId, updAgri, access);
          } else {
            console.log("Registration failed: ", res);
            this.snackbar.showNotification("snackbar-message", "Registration Failed");
            return [];
          }
        })
      ).subscribe({
        next: ((res) => {
          if (res && res.statusCode == 200) {
            console.log("Update res: ", res);
            this.snackbar.showNotification("snackbar-message", "Registarion successful");
            this.dialogRef.close();
          } else {
            console.log("Update failed");
            this.snackbar.showNotification("snackbar-message", "Registarion failed");
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
