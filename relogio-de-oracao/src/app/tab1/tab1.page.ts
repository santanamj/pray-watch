import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  phone: string;
	password: string;
  loading: any;
  message;
  user;
  public mask= ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(
    private authService: AuthService,
    public _route: Router,    
    private toast: ToastController, 
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public nav: NavController
  ) {
   
  }
  ionViewWillEnter(){
    this.authService.getProfile().subscribe((data: any)=>{        
      this.user = data.user;          
  })
  }
  login(){
    this.showLoader();
    const newValor = this.phone.replace(/[^\d]+/g,''); 
    let user = {
      phone: newValor,
      password: this.password
  };
  this.authService.login(user).subscribe(async(data: any) => {
    if (!data.success) {
      const toast = await this.toast.create({
        message: 'Erro no Login',
        duration: 2000
      });
      await  toast.present();
      this.loading.dismiss();
    } else {
      this.message = data.message;
      this.authService.storeUserData(data.token, data.user); 
      const toast = await this.toast.create({
        message: 'Login efetuado com sucesso!, redirecionando...',
        duration: 2000
      });
      toast.present();  
      this.loading.dismiss();
      setTimeout(()=>{       
        this._route.navigate(['/tabs/Home'])
      }, 2000)     
     
      
    }
});
}
criarConta(){
  this._route.navigate(['register'])
}
async showLoader(){
  this.loading = await this.loadingCtrl.create({
    message: 'Entrando...'
  });
  this.loading.present();
}
logout(){
  this.authService.logout();
  window.location.reload(true)
}
doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    window.location.reload(true)
  }, 100);
}
}
