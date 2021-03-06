import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
    isPrinting = false;

    constructor(private router: Router) { }

    printDocument(documentName: string, documentData: string) {
      this.isPrinting = true;
      this.router.navigate(['comandas',
            { outlets: 
                {
                    print: ['print', documentName, documentData]
                }
            }
        ]);
    }
    printCorte(documentName: string) {
      this.isPrinting = true;
      this.router.navigate(['caja',
            { outlets: 
                {
                    print: ['imprime', documentName]
                }
            }
        ]);
    }
    onDataReady() {
      setTimeout(() => {
        window.print();
        this.isPrinting = false;
        this.router.navigate([{ outlets: { print: null }}]).then(() =>
          this.router.navigate(['/']).then(() =>
            this.router.navigate(['/comandas/index'])
          )
        );
      });
    }
    onDataReadyCorte() {
      setTimeout(() => {
        window.print();
        this.isPrinting = false;
        this.router.navigate([{ outlets: { print: null }}]).then(() =>
          this.router.navigate(['/']).then(() =>
            this.router.navigate(['/caja/sales'])
          )
        );
      });
    }
}
