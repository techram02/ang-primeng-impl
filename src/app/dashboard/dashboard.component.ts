import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
interface City {
  name: string,
  code: string
}
import { Customer, Representative } from "../customer";
import { CustomerService } from "../customerservice";
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  options = { autoHide: true, scrollbarMinSize: 50 };
  date3: Date | undefined;
  date4: Date | undefined;
  cities: City[];
  cities1: City[];
  cities2: City[];
  cities3: City[];
  cities4: City[];
  selectedCity1: City | undefined;
  selectedCity2: City | undefined;
  selectedCity3: City | undefined;
  selectedCity4: City | undefined;
  customers: Customer[] = [];
  customers1: Customer[] = [];

  representatives: Representative[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  maxDate!: Date;
  minDate!: Date;
  customdate!: Date;
  enddate!: Date;
  duplicateArray!: any[]
  isChecked!: boolean;

  userForm!: FormGroup;
  userForm1!: FormGroup;
  datas = new Customer();
  header!: string;
  constructor(private primengConfig: PrimeNGConfig, private customerService: CustomerService,
    private fb: FormBuilder,
  ) {
    this.cities = [
      { name: 'Jan', code: 'NY' },
      { name: 'Feb', code: 'RM' },
      { name: 'March', code: 'LDN' },
      { name: 'Apr', code: 'IST' },
      { name: 'May', code: 'PRS' }
    ];
    this.cities1 = [
      { name: 'Work', code: 'NY' },
      { name: 'Time', code: 'RM' },
      { name: 'Task', code: 'LDN' },
    ];
    this.cities2 = [
      { name: 'Market', code: 'NY' },
      { name: 'Industry', code: 'RM' },
      { name: 'Management', code: 'LDN' },
      { name: 'Hr', code: 'IST' },
      { name: 'Goal', code: 'PRS' }
    ];
    this.cities3 = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.cities4 = [
      { name: 'Jan', code: 'NY' },
      { name: 'Feb', code: 'RM' },
      { name: 'March', code: 'LDN' },
      { name: 'Apr', code: 'IST' },
      { name: 'May', code: 'PRS' }
    ];

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.customerService.getCustomersLarge().then((customers: any) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        customer => (customer.date = new Date())
      );
      this.duplicateArray = customers;

      this.StoreOnLocalStorage(customers);
    });
    this.header = "Hours"
    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];

    this.userForm = this.fb.group({
      _Name: [''],
      _StartDate: [''],
      _EndDaate: [''],
      _Status: [''],
      _Verfified: []
    });

  }

  StoreOnLocalStorage(data: any) {
    var custom = { id: data.id, name: data.name, customdate: data.customdate, enddate: data.enddate, status: data.status, verified: data.verified };
    // console.log("custom values",custom);
    localStorage.setItem("customers", JSON.stringify(data));
    // console.log("JSON data: ",data);  
  }

  displayModal: boolean | undefined;

  displayBasic: boolean | undefined;

  displayBasic2: boolean | undefined;

  displayMaximizable: boolean | undefined;

  displayPosition: boolean | undefined;

  position: string | undefined;

  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }


  onDateChange(newDate: Date) {
    // console.log(newDate);
  }

  reverseAndTimeStamp(dateString: any) {
    const reverse = new Date(dateString);
    return reverse.getTime();
  }

  handleChange(e:any) {
    switch (e.index) {
      case 0:
        this.header = "Hours";
        break;
      case 1:
      this.header = "Schedules";
      break;
      case 2:
        this.header = "Accruals";
        break;
      case 3:
        this.header = "Occurrences";
        break;
      default:
        this.header = "Hours";
        break;
    }
}
  filterDate(){
    this.customerService.getCustomersLarge1().then((customers: any) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        customer => (customer.date = new Date())
      );
      this.duplicateArray = customers;
    });
  }
  filterDate1() {  
    var sd = document.getElementById('StartDate') as HTMLButtonElement;
    var ed = document.getElementById('EndDate') as HTMLButtonElement;
    let fromdate = moment(sd.value).format('YYYY-MM-DD');
    let todate = moment(ed.value).format('YYYY-MM-DD');
    var values: Customer[] = JSON.parse(localStorage.getItem("customers")!);
    this.customers = values;
    if (sd.value && ed.value) {
      var selectedMembers = this.customers.filter((m: any) => {
        return this.reverseAndTimeStamp(m.customdate) >= this.reverseAndTimeStamp(fromdate)
          && this.reverseAndTimeStamp(m.customdate) <= this.reverseAndTimeStamp(todate)
      }
      );
      this.duplicateArray = selectedMembers
    } else {
      this.duplicateArray = this.customers
    }
  }

  onSubmit() {
    var newId: number = Math.floor(Math.random() * 1000) + 1
    this.datas.id = newId;
    this.datas.name = this.userForm.value._Name;
    this.datas.customdate = this.userForm.value._StartDate;
    this.datas.enddate = this.userForm.value._EndDaate;
    this.datas.status = this.userForm.value._Status;
    this.datas.verified = this.userForm.value._Verfified;
    this.datas.customdate = moment(this.datas.customdate).format('YYYY-MM-DD')
    this.datas.enddate = moment(this.datas.enddate).format('YYYY-MM-DD')
    try {
      var values: Customer[] = JSON.parse(localStorage.getItem("customers")!);
      values.push(this.datas);
      var updatedvalue = values;
      this.duplicateArray = updatedvalue;
      localStorage.setItem('customers', JSON.stringify(updatedvalue));
    } catch {
      (e: any) => console.log(e);
    }
    this.userForm.reset();
  }

}
