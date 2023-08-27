import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.page.html',
  styleUrls: ['./relogio.page.scss'],
})
export class RelogioPage implements OnInit {
  horarios;
  agendas;
  dadoUser;
  diachat;
  user;
  form;
  agenda$: BehaviorSubject<any> = new BehaviorSubject("");
  constructor(
    private agendaService: AgendaService,
    private authService: AuthService,
    public formBuild: FormBuilder,
    public toastController: ToastController
  ) { 
    this.dadoUser = localStorage.getItem('user');
    this.dadoUser = JSON.parse(this.dadoUser);
    console.log(this.dadoUser)
    this.form = this.formBuild.group({
      descricao:['']
    })
  }
  ionViewWillEnter() {
    this.authService.getProfile().subscribe((data: any)=>{
     this.user = data.user;
    })
    if(this.dadoUser){
      this.agendaService.getAgendaUser(this.dadoUser._id).subscribe((data: any)=>{      
        if(data.length > 0){         
          this.agendas = data;
        this.horarios = this.agendas[0].datadia
        console.log(this.horarios);
        console.log( this.agendas[0].dia);
        this.agenda$.next(`${this.agendas[0].diaSemana, this.agendas[0].hora}`);  
        this.agendaService.getAgendaPray(this.agendas[0].dia, this.agendas[0].hora).subscribe((data: any)=>{
          
          console.log(data)
        })
        }

      })
     
    }
  
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      window.location.reload(true)
    }, 100);
  }
  downloadfile(){
    console.log('teste')
    let thefile = {};
    this.agendaService.downloadfile();    
}
logForm(){
 const pedidoUser = {  
  pedido: this.form.get('descricao').value,
  agendaId: this.agendas[0]._id
  }
  this.agendaService.updatePedido(pedidoUser).subscribe(async (data: any)=>{ 
  if(data.success){
    console.log(data)
  this.getUser()
  const toast = await this.toastController.create({
    message: 'Pedido enviado com sucesso!',
    duration: 2000
  });
  toast.present();
  this.form.reset();
}
 
})
}
getUser(){
  this.agendaService.getAgendaUser(this.dadoUser._id).subscribe((data: any)=>{      
    if(data.length > 0){         
      this.agendas = data;
 
    
    }
    })
    
}
  ngOnInit() {
  }

}
