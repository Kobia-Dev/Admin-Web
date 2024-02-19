import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-header',
  templateUrl: './role-header.component.html',
  styleUrls: ['./role-header.component.css']
})
export class RoleHeaderComponent {

  selectedType: string;
  roleFarmer: string = "farmer";
  roleRegionalManager: string = "regionalManager";
  roleFieldOfficer: string = "fieldOfficer";
  roleSme: string = "sme";

  @ViewChild('roleHeaderContainer', { read: ViewContainerRef })
  roleHeaderContainer!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder) { }

  farmerForm: FormGroup = this.formBuilder.group({

  });

  regionalManagerForm: FormGroup = this.formBuilder.group({

  });

  smeForm: FormGroup = this.formBuilder.group({

  });

  fieldOfficerForm: FormGroup = this.formBuilder.group({

  });

  public rolesChange(event: any) {

    if (event.value === "farmer") {
      this.selectedType = event.value;
    }
    if (event.value === "regionalManager") {
      this.selectedType = event.value;
    }
    if (event.value === "fieldOfficer") {
      this.selectedType = event.value;
    }
    if (event.value === "sme") {
      this.selectedType = event.value;
    }
  }


  // loadForm(): void {
  //   // Clear previous content
  //   if (this.roleHeaderContainer) {
  //     this.roleHeaderContainer.clear();
  //   }

  //   // Load the appropriate component
  //   if (this.selectedType === 'farmer') {
  //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormComponent);
  //     const componentRef = this.roleHeaderContainer.createComponent(componentFactory);
  //     // Optionally, you can pass data to the component
  //     // componentRef.instance.someInput = someValue;
  //   } else if (this.selectedType === 'SME') {
  //     // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SMEEnrollmentComponent);
  //     const componentRef = this.roleHeaderContainer.createComponent(componentFactory);
  //     // Optionally, you can pass data to the component
  //     // componentRef.instance.someInput = someValue;
  //   }
  // }
}
