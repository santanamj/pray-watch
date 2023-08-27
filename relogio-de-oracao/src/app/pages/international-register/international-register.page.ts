import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { Igreja } from 'src/app/model/igreja';
import { Router } from '@angular/router';
@Component({
  selector: 'app-international-register',
  templateUrl: './international-register.page.html',
  styleUrls: ['./international-register.page.scss'],
})
export class InternationalRegisterPage implements OnInit {
  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  phoneValid;
  phoneMessage;
  phone;
  role;
  loading: any;
  public MASKS = MASKS;
  igreja: string = '';
  outraIgreja: boolean;
  addIgreja;
  errorTelefone: boolean;
  public mask= ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  igrejas = [    
    'Aprisco Sede', 'Aprisco Lauro de Freitas', 'Aprisco Lisboa', 
    'Aprisco London', 'Aprisco SSA', 'Aprisco USA', 'Outra'
  ]
  constructor(
    private authService : AuthService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public _route: Router,  
    private formBuilder: FormBuilder,
    public toast: ToastController       
  ) { 
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      // name Input
      name: ['', Validators.required],
      // Phone Input
      phone: [''],
      role: [''],
      // Password Input
      password: ['', Validators.required],
      igreja: [''],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
  }
  // Function to disable the registration form
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['phone'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }
  // Function to enable the registration form
  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['phone'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }
// Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }
  // Function to submit form
  onRegisterSubmit() {
    this.showLoader()
    const user = {
      name: this.form.get('name').value, // E-mail input field
      phone: this.form.get('phone').value.toLowerCase(), // Phone input field
      password: this.form.get('password').value,
      igreja: this.igreja
    }
    console.log(user)   
    const login ={
      phone: this.form.get('phone').value.toLowerCase(), // Phone input field
      password: this.form.get('password').value,
    }
    this.authService.registerUser(user).subscribe((data: any) => {
      this.message = data.message;
      if(data.success){
        this.authService.login(login).subscribe(async(data: any) => {
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
              this._route.navigate(['/dia'])
            }, 2000)    
          }
      });
        this.toast.create({ message: 'Registro criado com sucesso', duration: 3000 });
        setTimeout(() => {
          this.form.reset();
          this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
          this.disableForm(); // Disable the form        
          this.message = true;     
          this.toast.dismiss();     
        }, 3000)
      }else{
        this.message 
        this.toast.create({ message: `${this.message}`, duration: 3000 });
      }
    });
  }
  async showLoader(){
    this.loading = await this.loadingCtrl.create({
      message: 'Entrando...'
    });
    this.loading.present();
  }
 // Function to check if e-mail is taken
  checkPhone() {
    const valorPhone = this.form.get('phone').value;
     const newValor = valorPhone.replace(/[^\d]+/g,'');    
     if (newValor.length == 10) {
    this.authService.checkPhone(newValor).subscribe((data: any) => {
      // Check if success true or false was returned from API
      console.log(data)
      if (!data.success) {
        console.log(data)
        this.phoneMessage = false; // Return phone as invalid
        this.errorTelefone = true;
      } else {
        this.phoneMessage = true; // Return phone as valid
        this.errorTelefone = false;
      }
    });
  }
  }
 onChange($event){
    const newIgreja = $event.target.value;
    console.log(newIgreja)
    if(newIgreja == 'Outra'){
      this.outraIgreja = true;
    }else{
      this.igreja = $event.target.value
      this.outraIgreja = false;
    }   
 }
 nomeoutraIgreja(){
  this.igreja = this.form.get('igreja').value
 }
  ngOnInit() {
  }


}
