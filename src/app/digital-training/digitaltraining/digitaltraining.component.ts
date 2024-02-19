import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digitaltraining',
  templateUrl: './digitaltraining.component.html',
  styleUrls: ['./digitaltraining.component.css']
})
export class DigitaltrainingComponent implements OnInit {

  externalUrl: string | null = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');
      if (url) {
        this.externalUrl = decodeURIComponent(url);
      }
    });
  }
  @ViewChild('iframe') iframe: ElementRef;
  
   ngAfterViewInit() {
     const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentElement.contentWindow;
     const content = `
         templateUrl
     `;
  
     doc.open();
     doc.write(content);
     doc.close();
   }
}