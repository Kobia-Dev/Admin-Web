import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AuthService } from "src/app/core/service/auth.service";
import { Subject, takeUntil } from "rxjs";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }


  ngOnInit() {
    this.authForm = this.formBuilder.group({
      emailOrNationalId: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Input Username and Password !";
      return;
    } else {
      console.log(this.authForm.value);
      this.authService.login(this.authForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: ((res) => {

          if (res.statusCode === 200) {

            this.submitted = false;
            this.loading = false;
            this.tokenStorage.saveToken(res.entity.access_token);
            this.tokenStorage.saveUser(res.entity);
            const role = res.entity.role;
            console.log("entity", res.entity);
            if (role == Role.Admin) {
              console.log("Role:", role);
              this.router.navigate(['/admin/dashboard']);
            } 
              if (role == Role.Staff) {
                console.log("Role:", role);
                this.router.navigate(['/regionalmanager/dashboard']);
              
              console.log("Access denied");
            }
          } else {
            this.error = res.message;
            this.submitted = false;
            this.loading = false;
            console.log("Message", res.message);
          }
        }),
        error: ((error) => {
          this.error = error;
          console.log(error);
          this.submitted = false;
          this.loading = false;
        }),
        complete: (() => { })

      })
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

}