import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { FarmerService } from '../../services/farmer.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subject, takeUntil, Subscription, of, throwError } from "rxjs";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ValuechainService } from '../../services/valuechain.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-farmer-onboarding',
  templateUrl: './farmer-onboarding.component.html',
  styleUrls: ['./farmer-onboarding.component.css']
})
export class FarmerOnboardingComponent implements OnInit {

  dialogTitle: string = '';
  hide = true;
  loading: boolean = false;
  submitted = false;
  base64Image: any;
  base64String: string | null = null;
  selectedFile!: File;
  latitude: number = 0;
  longitude: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  actualToken: any;
  access_token: any;
  id: any;
  gend: any;
  type: any;
  valueChains: any;

  constructor(private farmerService: FarmerService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private token_storage: TokenStorageService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private valueChainService: ValuechainService) {
  }

  ngOnInit() {
    this.getAllValueChain();
    this.dialogTitle = "Onboard Farmer";
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
        console.log("Error fetchin value chains", error);
      }),
      complete: () => { }
    });
  }

  onBoardFarmerForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNo: ['', Validators.required],
    role: ["", Validators.required],
    idNo: ['', Validators.required],
    // bio: ['', Validators.required],
    // img: ['', Validators.required],
    gender: ['', Validators.required],
    typeOfAgriculture: ['', Validators.required],
    valueChain: ['', Validators.required]
  });

  submit() {
    this.submitted = true;
    this.loading = true;
    console.log("Submitted data", this.onBoardFarmerForm.value);
    if (this.onBoardFarmerForm.invalid) {
      console.log("Invalid data!");
      return;
    } else {
      const regFarmer = {
        firstName: this.onBoardFarmerForm.value.firstname,
        lastName: this.onBoardFarmerForm.value.lastname,
        email: this.onBoardFarmerForm.value.email,
        password: this.onBoardFarmerForm.value.password,
        phoneNo: this.onBoardFarmerForm.value.phoneNo,
        role: this.onBoardFarmerForm.value.role,
      };
      this.id = this.onBoardFarmerForm.value.idNo,
      this.gend = this.onBoardFarmerForm.value.gender,
      this.type = this.onBoardFarmerForm.value.typeOfAgriculture

      this.farmerService.addFarmer(regFarmer).pipe(
        switchMap((res) => {
          console.log("Registering");
          if (res["statusCode"] == 201) {

            console.log(res.message)
            const farmerId = res.entity.id;
            console.log("FarmerId", farmerId);
            const updFarmer = {
              idNumber: this.id,
              gender: this.gend,
              typeOfFarming: this.type,
              valueChainId: this.onBoardFarmerForm.value.valueChain
            };

            //Get user access token
            const data = this.token_storage.getUser();
            let access = data.access_token;
            console.log("Token: ", access)
            //update farmer
            return this.farmerService.updFarmer(farmerId, updFarmer, access);
          } else {
            console.log("Registration failed. Response:", res);
            return [];
          }
        })
      ).subscribe({
        next: (res) => {
          if (res && res.statusCode === 200) {
            console.log("Update res:", res);
            this.snackBar.showNotification("snackbar-message", "Farmer registered succesfully");
            this.dialogRef.close();
          } else {
            console.log("Update failed", res);
            this.snackBar.showNotification("snackbar-message", "Farmer registration failed");
          }
        },
        error: (error) => {
          console.log("Update failed:", error);
        },
        complete: () => { }
      });
    
    }
  }

  // onSelectedFile(event: any){
  //   this.selectedFile = event.target.files[0];
  //   this.convertToBase64(this.selectedFile).then((base64String) => {
  //     console.log('Base64 string:', base64String);
  //   });
  // }

  // async convertImageToBase64(){
  //   if(this.selectedFile){
  //     try{
  //       this.base64String = await this.convertToBase64(this.selectedFile);
  //       console.log("image base64:", this.base64String)
  //     }catch (error) {
  //       console.log(error)
  //     }
  //   }else{
  //     console.log("No image selected");
  //   }
  // }

  // async convertToBase64(file: File): Promise<string>{
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       resolve(reader.result as string);
  //       this.base64Image = reader.result;
  //       this.onBoardFarmerForm.controls['img'].setValue(this.base64Image);
  //     };

  //     reader.onerror = () => {
  //       reject('Error occurred while reading the file')
  //     };

  //     reader.readAsDataURL(file);
  //   })
  // }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
