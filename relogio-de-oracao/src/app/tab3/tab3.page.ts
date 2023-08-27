import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Dias } from '../model/dia';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  agendas;
  dia;
  listDia;
  user;
  selecteUser;
  horarios;
  irmaopray;
  dias: Dias [] = 
  [ { 
    'title': 'Domingo', 'day': 'Sunday'
   },
   { 
    'title': 'Segunda-feira', 'day': 'Monday'
   },
   { 
    'title': 'Terça-feira', 'day': 'Tuesday'
   },
   { 
    'title': 'Quarta-feira', 'day': 'Wednesday'
   },
   { 
    'title': 'Quinta-feira', 'day': 'Thursday'
   },
   { 
    'title': 'Sexta-feira', 'day': 'Friday'
   },
   { 
    'title': 'Sábado', 'day': 'Saturday'
   },
    ]
  constructor(
    private agendaService: AgendaService,
    private authService: AuthService,
    public _route: Router,    
    public toastController: ToastController
  ) {
    
  }
  ionViewWillEnter() {
    this.authService.getProfile().subscribe((data: any)=>{
      if(data.success){
        this.user = data.user;
        this.agendaService.getAgendaUser(this.user._id).subscribe((data: any)=>{      
          if(data.length > 0){         
            const agendaData = data;
          this.horarios = agendaData[0].datadia
          console.log(this.horarios);
          console.log( agendaData[0].dia);
           
          this.agendaService.getAgendaPray(agendaData[0].dia, agendaData[0].hora).subscribe((data: any)=>{
            this.irmaopray = data;
            console.log(data)
          })      
  
        }
  
    })
  }else{
    this._route.navigate(['/tabs/tab1'])
  }  
      
    })
  }
  selected(event){
    if(this.user.role == 'geral' && this.selecteUser !== event || 
    this.user.role == 'geral' && !this.selecteUser){
      this.selecteUser =  event;
      console.log(this.selecteUser)
    }else{
      this.selecteUser = null;
    } 
  }
  onChange(event){
   this.dia = event.target.value; 
   this.agendaService.getAgendaDay(this.dia).subscribe((data: any)=>{
    this.agendas = data;
    console.log(data)
  })
 }
 deleteAgenda(){
  this.agendaService.deleteAgenda(this.selecteUser._id).subscribe(async (data: any)=>{
    if(data.success){
      this.authService.updateHorarioStatusChange(this.selecteUser).subscribe(async (res: any)=>{
        if(res.success){
          const toast = await this.toastController.create({
            message: `${data.message}`,
            duration: 2000
          });
          toast.present();
          setTimeout(()=>{
           this.reloadDias();
          }, 2000) 
        }         
      })       
    }else{
      const toast = await this.toastController.create({
        message: `${data.message}`,
        duration: 2000
      });
      toast.present();
    }
  })
 }
 reloadDias(){
  this.agendaService.getAgendaDay(this.dia).subscribe((data: any)=>{
    this.agendas = data;
    console.log(data)
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
