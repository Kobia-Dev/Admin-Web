import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { ValuechainService } from '../../services/valuechain.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-value-chain',
  templateUrl: './value-chain.component.html',
  styleUrls: ['./value-chain.component.css']
})
export class ValueChainComponent {

  hide = true;
  loading: boolean = false;
  submitted = false;
  error = "";
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder,
    private vaulechainService: ValuechainService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService) { }

  valueChainForm: FormGroup = this.formBuilder.group({
    valueName: ['', Validators.required],
    description: ['', Validators.required]
  })

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.valueChainForm.invalid) {
      this.error = "Email and Password not valid !";
      return;
    } else {
      const regValue = {
        valueChain: this.valueChainForm.value.valueName,
        description: this.valueChainForm.value.description
      };
      console.log("Registration data", regValue);
      const data = this.tokenStorage.getUser();
      let access = data.access_token;
      this.vaulechainService.addValueChain(regValue, access).pipe(takeUntil(this.destroy$)).subscribe({
        next: ((res) => {
          if (res["statusCode"] == 200) {
            console.log("Value chain added successfully");
            this.snackbar.showNotification("snackbar-message", "Value chain added successfully");
            this.dialogRef.close();
          }
        }),
        error: ((error) => {
          console.log("Error", error);
        }),
        complete: (() => { })
      })
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
