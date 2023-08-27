import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dias } from 'src/app/model/dia';
import { AgendaService } from 'src/app/services/agenda.service';
import * as moment from 'moment';
import { AlertController, ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { compareAsc, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { AuthService } from 'src/app/services/auth.service';
import { StoreHoras } from 'src/app/stores/horas';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-dia',
  templateUrl: './dia.page.html',
  styleUrls: ['./dia.page.scss'],
})
export class DiaPage implements OnInit {
  selectedDay;
  exportDay;
  diasOracao;
  user;
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
    public _route: Router, 
    private agendaService: AgendaService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private authService: AuthService,
    private toast: ToastController,
    private storeHoras: StoreHoras,
  ) { 
    this.authService.getProfile().subscribe(async(data: any)=>{   
      if(data.success){
        this.user = data.user;
        if(this.user.horario){
          const toast = await this.toast.create({
            message: 'Já existe horário cadastrado! Redirecionando...',
            duration: 2000
          });
          toast.present();
          setTimeout(()=>{
            this._route.navigate(['/tabs/Home'])
          }, 2000)    
      }else{
      
      }  
    }
    })   
   
  }
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.agendaService.getHorasClear();
    this.storeHoras.getHoras().subscribe((data: any)=>{     
     })
  }
  selected(event){
   
    this.exportDay =  event
    this.selectedDay = event.title;
    this.sundaysInMonth()
  }
  chooseHours(){
    this.agendaService.getHoras(this.exportDay.day).subscribe()
    this.agendaService.createDia(this.exportDay);
    this._route.navigate(['/hora', {horarios: JSON.stringify(this.diasOracao)}])  
  }
 async sundaysInMonth() {
    var items = [] 
    var dia = moment().month('September')
    .startOf('month')
    .day(this.exportDay.day);
if (dia.date() > 7) dia.add(7,'d');
var month = dia.month();
while(month === dia.month()){   
    const diaSemana = dia.toISOString();
    items.push(diaSemana)
   
    dia.add(7,'d');
   
}
let NewDate = [];
for(let i = 0; items.length > i; i++){
  NewDate.push(format(new Date(items[i]), 'dd-MM-yyyy'))
   
}
this.diasOracao = NewDate



}

 

}
