import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dadoUser;
  user;
  constructor(
    private authService: AuthService,
    public _route: Router,    
  ) {  
    
  }
  ionViewWillEnter(){
    this.authService.getProfile().subscribe((data: any)=>{   
      if(data.success){
        this.user = data.user;       
      }else{
        this._route.navigate(['/tabs/tab1'])
      }  
      
    })
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      window.location.reload(true)
    }, 100);
  }
}
