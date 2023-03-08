import { Component,OnInit } from '@angular/core';
// declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  options = { autoHide: true, scrollbarMinSize: 50 };
  ngOnInit(): void {
  //   $(document).ready(function () {

  //     $('#sidebarCollapse').on('click', function () {
  //       $('#sidebar, #content').toggleClass('active');
  //       $('.collapse.in').toggleClass('in');
  //       $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  //   });
  // });
  // }
  }
}
