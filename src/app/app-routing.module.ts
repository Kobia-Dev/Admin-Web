import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { Page404Component } from "./authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "admin",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      
      {
        path: "agrodealer",
        loadChildren: () =>
          import("./agrodealer/agrodealer.module").then((m) => m.AgrodealerModule),
      },
      {
        path: "customers",
        loadChildren: () =>
          import("./customers/customers.module").then((m) => m.CustomersModule),
      },
      {
        path: "digitalTraining",
        loadChildren: () => import('./digital-training/digital-training.module')
          .then(m => m.DigitalTrainingModule)
      },
      {
        path: "driver",
        loadChildren: () => import('./driver/driver.module')
          .then(m => m.DriverModule)
      },
      {
        path: "enrollment",
        loadChildren: () =>
          import("./enrollment/enrollment.module").then((m) => m.EnrollmentModule),
      },
      {
        path: "farmers",
        loadChildren: () =>
          import("./farmers/farmers.module").then((m) => m.FarmersModule),
      },
      {
        path: "manufacturer",
        loadChildren: () =>
          import("./manufacturer/manufacturer.module").then((m) => m.ManufacturerModule),
      },
      {
        path: "market",
        loadChildren: () => import("./market-place/market-place.module").then(m => m.MarketPlaceModule)
      },
      {
        path: "processors",
        loadChildren: () => import('./processors/processors.module')
          .then(m => m.ProcessorsModule)
      },
     
      {
        path: "serviceprovider",
        loadChildren: () =>
          import("./serviceprovider/serviceprovider.module").then((m) => m.ServiceproviderModule),
      },
      {
        path: "staff",
        loadChildren: () => import('./staff/staff.module')
          .then(m => m.StaffModule)
      },
      {
        path: "transactions",
        loadChildren: () => import('./transactions/transactions.module')
          .then(m => m.TransactionsModule)
      },
      {
        path: "valuechains",
        loadChildren: () => import('./valuechains/valuechains.module')
          .then(m => m.ValuechainsModule)
      },
      {
        path: "warehouses",
        loadChildren: () => import('./warehouse/warehouse.module')
          .then(m => m.WarehouseModule)
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }