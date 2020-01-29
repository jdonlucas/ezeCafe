import { Component, OnInit } from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  
  public loaded = false;
  public today = new Date()
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;

  constructor(
    private printService: PrintService) { }

  ngOnInit() {
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {  
      images[i].addEventListener('load', () => {
        this.loaded = true;
      })
    }
  }

}
