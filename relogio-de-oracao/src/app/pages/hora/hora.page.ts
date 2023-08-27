import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Horas } from 'src/app/model/hora';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { StoreHoras } from 'src/app/stores/horas';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-hora',
  templateUrl: './hora.page.html',
  styleUrls: ['./hora.page.scss'],
})
export class HoraPage implements OnInit {
  horas$: Observable<any[]>;
  selectedDay;
  day;
  dadoUser;
  horaDisabled;
  horarios;
  subscription: Subscription;
  horas: Horas [] = 
  [
    {
      'hora': '00', 'status': 'ativo'
    }, {'hora': '01',  'status': 'ativo'}, {'hora': '02',  'status': 'ativo'}, {'hora': '03',  'status': 'ativo'}, {'hora': '04',  'status': 'ativo'}, {'hora': '05',  'status': 'ativo'}, {'hora': '06',  'status': 'ativo'},
    {'hora': '07',  'status': 'ativo'}, {'hora': '08',  'status': 'ativo'}, {'hora': '09',  'status': 'ativo'}, {'hora': '10',  'status': 'ativo'}, {'hora': '11',  'status': 'ativo'}, {'hora': '12',  'status': 'ativo'},
    {'hora': '13',  'status': 'ativo'}, {'hora': '14',  'status': 'ativo'}, {'hora': '15',  'status': 'ativo'}, {'hora': '16',  'status': 'ativo'}, {'hora': '17',  'status': 'ativo'},
    {'hora': '18',  'status': 'ativo'}, {'hora': '19',  'status': 'ativo'}, {'hora': '20',  'status': 'ativo'}, {'hora': '21',  'status': 'ativo'}, {'hora': '22',  'status': 'ativo'}, {'hora': '23',  'status': 'ativo'},
  ]
  constructor(
    private agendaService: AgendaService,
    private storeHoras: StoreHoras,
    private authService: AuthService,
    private route: ActivatedRoute,
    public toastController: ToastController,
    public _route: Router, 
  ) {
    this.horarios = this.route.snapshot.paramMap.get('horarios');  
    this.horarios = JSON.parse(this.horarios);
    this.horarios = this.horarios.map((item)=>{
      return {'dia': item}
    })     
   
    this.agendaService.listdia.subscribe((data: any)=>{
      this.day = data;
    })
    this.dadoUser = localStorage.getItem('user');
    this.dadoUser = JSON.parse(this.dadoUser);   
   }
   ionViewWillEnter(){   
    this.horas$ = this.storeHoras.getHoras();
    this.subscription = this.horas$.subscribe((data:any)=>{})
   }
   ngOnDestroy() {
    window.location.reload()
    this.subscription.unsubscribe()
}
   ngDoCheck(){
   
   }
   selected(event){   
    this.selectedDay = event.hora;
    
  }
  addAgenda(){
    const agenda = {
      hora: this.selectedDay,
      datadia: this.horarios,
      diaSemana: this.day.day,
      dia:this.day.title,
      userId: this.dadoUser._id,
      name:this.dadoUser.name,
      phone: this.dadoUser.phone
    }
    this.agendaService.addAgenda(agenda).subscribe(async (data: any)=>{
      if(data.success){
        this.authService.updateHorarioStatus(this.dadoUser).subscribe(async (res: any)=>{
          if(res.success){
            const toast = await this.toastController.create({
              message: 'Horário e datas cadastrados com sucesso! Redirecionando...',
              duration: 2000
            });
            toast.present();
            setTimeout(()=>{
              this._route.navigate(['/tabs/relogio'])
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
  ngOnInit() {
  }

}
