import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoreHoras } from '../stores/horas';
import { map, tap, catchError } from "rxjs/operators";
import { FileSaverService } from 'ngx-filesaver';
import { Horas } from '../model/hora';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  domain = environment.domain;
  horas: Horas [] = 
  [
    {
      'hora': '00', 'status': 'ativo'
    }, {'hora': '01',  'status': 'ativo'}, {'hora': '02',  'status': 'ativo'}, {'hora': '03',  'status': 'ativo'}, {'hora': '04',  'status': 'ativo'}, {'hora': '05',  'status': 'ativo'}, {'hora': '06',  'status': 'ativo'},
    {'hora': '07',  'status': 'ativo'}, {'hora': '08',  'status': 'ativo'}, {'hora': '09',  'status': 'ativo'}, {'hora': '10',  'status': 'ativo'}, {'hora': '11',  'status': 'ativo'}, {'hora': '12',  'status': 'ativo'},
    {'hora': '13',  'status': 'ativo'}, {'hora': '14',  'status': 'ativo'}, {'hora': '15',  'status': 'ativo'}, {'hora': '16',  'status': 'ativo'}, {'hora': '17',  'status': 'ativo'},
    {'hora': '18',  'status': 'ativo'}, {'hora': '19',  'status': 'ativo'}, {'hora': '20',  'status': 'ativo'}, {'hora': '21',  'status': 'ativo'}, {'hora': '22',  'status': 'ativo'}, {'hora': '23',  'status': 'ativo'},
  ]
  horaDisabled;
  addDia: BehaviorSubject<string> = new BehaviorSubject<any>('');
  public get listdia(): Observable<any>{
    return this.addDia.asObservable();
  }
  
  constructor(
    private http: HttpClient,
    private storeHoras: StoreHoras,
    private _FileSaverService: FileSaverService
  ) { }

  getHoras(dia){
    return this.http.get(this.domain + '/api/getAgenda/' + dia)
    .pipe(map(((item: any) => {
     
      this.horaDisabled = item;
      for(let i = 0 ; i < this.horas.length; i++){
        for(let j = 0; j < this.horaDisabled.length; j++){
          if( this.horas[i].hora == this.horaDisabled[j].hora ){
            this.horas[i] = {'hora':this.horas[i].hora, 'status': 'disable' }
          }else{
            this.horas[i] = this.horas[i]
          }
        }
        this.storeHoras.set('horas', this.horas)
        
      }
     
    })))
  }
  getHorasClear(){
    this.storeHoras.set('horas', []);
   
  }
  getAgendaDay(dia){
    return this.http.get(this.domain + '/api/getAgendaDay/' + dia); 
  }
  getAgendaPray(dia, hora){
    return this.http.get(this.domain + '/api/getAgendaPray/?' + `dia=${dia}&hora=${hora}`) 
  }
  addAgenda(agenda){
    return this.http.post(this.domain + '/api/addAgenda', agenda)
  }
  getAgendaUser(user){
    return this.http.get(this.domain + '/api/agendaUser/' + user);
  }
  deleteAgenda(id){
    return this.http.delete(this.domain + '/api/deleteAgenda/' + id);
  }
  getAgenda(){
    return this.http.get(this.domain + '/api/agendaHoracoes');
  }
  createDia(dia){    
    this.addDia.next(dia);    
  }
  updatePedido(id){
    return this.http.put(this.domain + '/api/agendaPedido/', id)
  }
  downloadfile(){
    const fileName = `save.${'pdf'}`;
    
      this.http.get('https://res.cloudinary.com/djbfmiwlg/image/upload/v1630452711/pedido-oracao.pdf', {
        observe: 'response',
        responseType: 'blob'
      }).subscribe(res => {
        this._FileSaverService.save(res.body, fileName);
      });      
   
  
   
   
             
 }
}
