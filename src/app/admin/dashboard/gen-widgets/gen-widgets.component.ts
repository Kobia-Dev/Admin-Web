import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FarmerService } from "../../services/farmer.service";
import { Subject } from "rxjs";
import { CustomerService } from "../../services/customer.service";
import { ManufacturerService } from "../../services/manufacturer.service";
import { ServiceProviderService } from "../../services/service-provider.service";
import { StaffService } from "../../services/staff.service";
import { WarehouseService } from "../../services/warehouse.service";
import { DriverService } from "../../services/driver.service";
import { ProcessorsService } from "../../services/processors.service";
import { AgribusinessService } from "../../services/agribusiness.service";

@Component({
  selector: "app-gen-widgets",
  templateUrl: "./gen-widgets.component.html",
  styleUrls: ["./gen-widgets.component.sass"],
})
export class GenWidgetsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  farmers: any[] =[];
  farmersCount: number = 0;
  customers: any[] = [];
  customersCount: number = 0;
  manufacturers: any[] =[];
  manufacturersCount: number = 0;
  serviceProviders: any[] = [];
  providersCount: number = 0;
  staff: any[] = [];
  staffCount: number = 0;
  warehouses: any[] = [];
  warehoseCount: number = 0;
  processors: any[] = [];
  processorsCount: number = 0;
  drivers: any[] = [];
  driversCount: number = 0;
  agrodealears: any[] = [];
  agrodelearsCount: number = 0;

  constructor(
    private farmerService: FarmerService,
    private customerService: CustomerService,
    private manufacturerService: ManufacturerService,
    private providersService: ServiceProviderService,
    private staffService: StaffService,
    private warehouseService: WarehouseService,
    private diverServive: DriverService,
    private processorService: ProcessorsService,
    private agrodealersService: AgribusinessService) {}

  ngOnInit(): void {
    this.getCustomer();
    this.getFarmers();
    this.getManufacturers();
    this.getServiceProviders();
    this.getStaff();
    this.getWarehouses();
    this.getDrivers();
    this.getProcessors();
    this.getAgrodelears();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
  private getCustomer(){
    this.customerService.getAllCustomers().subscribe({
      next: ((res) => {
        this.customers = res.entity;
        this.customersCount = this.customers.length;
      }),
      error: ((error) => {
        console.log("Error fetching customers", error);
      }),
      complete: (() => {})
    })
  }

  private getDrivers(){
    this.diverServive.getAlldrivers().subscribe({
      next: ((res) => {
        this.drivers = res.entity;
        this.driversCount = this.drivers.length;
      }),
      error: ((error) => {
        console.log("Error fetching drivers", error)
      }),
      complete: (() => {})
    })
  }

  private getProcessors(){
    this.processorService.getAllProcesors().subscribe({
      next: ((res) => {
        this.processors = res.entity;
        this.processorsCount = this.processors.length;
      }),
      error: ((error) => {
        console.log("Error fetching processors", error);
      }),
      complete: (() => {})
    })
  }

  private getAgrodelears(){
    this.agrodealersService.getAllAgribusiness().subscribe({
      next: ((res) => {
        this.agrodealears = res.entity;
        this.agrodelearsCount = this.agrodealears.length;
      }),
      error: ((error) => {
        console.log("Error fetching agrodealers", error);
      }),
      complete: (() => {})
    })
  }

  private getFarmers(){
    this.farmerService.getAllFarmers().subscribe({
      next: ((res) => {
        this.farmers = res.entity;
        this.farmersCount = this.farmers.length;
      }),
      error: ((error) => {
        console.log("Error Fetching farmers", error);
      }),
      complete: (() => {})
    })
  }

  private getManufacturers(){
    this.manufacturerService.getAllManufacturers().subscribe({
      next: ((res) => {
        this.manufacturers = res.entity;
        this.manufacturersCount = this.manufacturers.length;
      }),
      error: ((error) => {
        console.log("Error fetching manufacturers", error);
      }),
      complete: (() => {})
    })
  }

  private getServiceProviders(){
    this.providersService.getAllServiceProviders().subscribe({
      next: ((res) => {
        this.serviceProviders = res.entity;
        this.providersCount = this.serviceProviders.length;
      }),
      error: ((error) => {
        console.log("Error fetching servive providers", error);
      }),
      complete: (() => {})
    })
  }

  private getStaff(){
    this.staffService.getAllStaff().subscribe({
      next: ((res) => {
        this.staff = res.entity;
        this.staffCount = this.staff.length;
      }),
      error: ((error) => {
        console.log("Error fetching staff", error);
      }),
      complete: (() => {})
    })
  }

  private getWarehouses(){
    this.warehouseService.getAllWarehouses().subscribe({
      next: ((res) => {
        this.warehouses = res.entity;
        this.warehoseCount = this.warehouses.length;
      }),
      error: ((error) => {
        console.log("Error fetching warehouses", error);
      }),
      complete: (() => {})
    })
  }
}