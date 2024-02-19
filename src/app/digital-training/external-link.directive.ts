import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appExternalLink]'
})
export class ExternalLinkDirective {
  @Input() externalLink: string | undefined;


  constructor( private router: Router) { }
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.externalLink && this.externalLink.startsWith('http')) {
      event.preventDefault();
      const externalUrl = encodeURIComponent(this.externalLink);
      this.router.navigate(['/external-content', externalUrl]);
    }
  }
}
