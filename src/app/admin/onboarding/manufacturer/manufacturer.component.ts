import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { DateTime } from 'ts-luxon';
import { ManufacturerService } from '../../services/manufacturer.service';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { ValuechainService } from '../../services/valuechain.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit, OnDestroy {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  destroy$: Subject<boolean> = new Subject<boolean>();
  manufacturingCategory: any;
  manufacturingSubCategory: any;
  valueChains: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private manufactureService: ManufacturerService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private valueChainService: ValuechainService) { }

  onBoardManufacturerForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    gender: ['', Validators.required],
    licenceNo: ['', Validators.required],
    manufacturerName: ['', Validators.required],
    manufacturerEmail: ['', Validators.required],
    manufacturerPhone: ['', Validators.required],
    manufacturerDescr: ['', Validators.required],
    manufacturerCategory: ['', Validators.required],
    manufacturerSubCategory: ['', Validators.required],
    workingHourStart: ['', Validators.required],
    workingHourStop: ['', Validators.required],
    workingDays: ['', Validators.required],
    valueChain: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getAllManufacturingCategories();
    const categoryId = this.onBoardManufacturerForm.value.manufacturerCategory;
    
    this.onBoardManufacturerForm.get('manufacturerCategory')?.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe((categoryId) => {
      if (categoryId) {
        this.getAllManufacturingSubCategories();
      } else {
        this.manufacturingSubCategory = [];
      }
    })
    this.getAllValueChain();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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

  getAllManufacturingCategories() {
    this.manufactureService.getManufacturingCategory().subscribe({
      next: ((res) => {
        this.manufacturingCategory = res.entity;
        console.log("Category", this.manufacturingCategory);
      }),
      error: ((error) => {
        console.log("Error fetching Manufacturing categories: ", error);
      }),
      complete: () => { }
    })
  }

  getAllManufacturingSubCategories() {
    this.manufactureService.getManufacturingSubCategory(this.onBoardManufacturerForm.value.manufacturerCategory).subscribe({
      next: ((res) => {
        console.log("Category Id:", this.onBoardManufacturerForm.value.manufacturerCategory);
        this.manufacturingSubCategory = res.entity;
        console.log("SubCategory", this.manufacturingSubCategory);
      }),
      error: ((error) => {
        console.log("Error manufacturing sub category");
      }),
      complete: (() => { })
    })
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.onBoardManufacturerForm.get('workingHourStart')?.disabled) {
      timepicker.open();
    }
  }

  openIcon(time: { open: () => void }) {
    if (!this.onBoardManufacturerForm.get('workingHourStop')?.disabled) {
      time.open();
    }
  }
  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    console.log("Submitted data", this.onBoardManufacturerForm.value);

    if (this.onBoardManufacturerForm.invalid) {
      this.error = "Invalid data";
      return;
    } else {
      const regManufacturer = {
        firstName: this.onBoardManufacturerForm.value.firstname,
        lastName: this.onBoardManufacturerForm.value.lastname,
        email: this.onBoardManufacturerForm.value.email,
        password: this.onBoardManufacturerForm.value.password,
        phoneNo: this.onBoardManufacturerForm.value.phoneNo,
        role: this.onBoardManufacturerForm.value.role,
      };
      this.manufactureService.registerManufacturer(regManufacturer).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {

            console.log("Registration response:", res);

            const manId = res.entity.id;
            console.log("ManufacturerId:", manId);
            const updManufacturer = {
              user: {
              },
              idNumber: this.onBoardManufacturerForm.value.idNo,
              bio: this.onBoardManufacturerForm.value.bio,
              gender: this.onBoardManufacturerForm.value.gender,
              licenceNumber: this.onBoardManufacturerForm.value.licenceNo,
              manufacturerName: this.onBoardManufacturerForm.value.manufacturerName,
              manufacturerEmail: this.onBoardManufacturerForm.value.manufacturerEmail,
              manufacturerPhoneNumber: this.onBoardManufacturerForm.value.manufacturerPhone,
              manufacturerDescription: this.onBoardManufacturerForm.value.manufacturerDescr,
              categoryId: this.onBoardManufacturerForm.value.manufacturerCategory,
              subCategoryId: this.onBoardManufacturerForm.value.manufacturerSubCategory,
              valueChainId: this.onBoardManufacturerForm.value.valueChain,
              workingHours: {
                startHour: this.onBoardManufacturerForm.value.workingHourStart,
                endHour: this.onBoardManufacturerForm.value.workingHourStop
              },
              workingDays: this.onBoardManufacturerForm.value.workingDays,
            };
            console.log("Update data:", updManufacturer);
            //Get user's access_token
            const data = this.tokenStorage.getUser();
            let access = data.access_token;
            //Update Manufactturer
            return this.manufactureService.updateManufacturer(manId, updManufacturer, access);
          } else {
            console.log("Update failed: ", res);
            return [];
          }
        })
      ).subscribe({
        next: (res) => {
          if (res && res.statusCode == 200) {
            console.log("Update res: ", res);
            this.snackbar.showNotification("snackbar-message", "Manufacturer registered successfully");
            this.dialogRef.close();
          } else {
            console.log("Update failed");
            this.snackbar.showNotification("snackbar-message", "Registration Failed");
          }
        },
        error: (error) => {
          console.log("Error in subscribe:", error)
        },
        complete: () => { }
      })
    }
  }
  onClear($event: Event) {
    this.onBoardManufacturerForm.get('workingHourStart')?.setValue(null);
  }
  clear($event: Event) {
    this.onBoardManufacturerForm.get('workingHourStop')?.setValue(null);
  }
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onClick(): void {
    this.dialogRef.close();
  }
}