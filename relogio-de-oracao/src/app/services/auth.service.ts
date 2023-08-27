import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = environment.domain;
  authToken: any;
  user: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient
  ) { }
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  storeClientData(code, name, valorUser, _id) {
    console.log(_id)
    localStorage.setItem('codeClient', code); // Set token in local storage
    localStorage.setItem('name', JSON.stringify(name)); // Set user in local storage as string
    localStorage.setItem('valor', valorUser);
    localStorage.setItem('_id', _id);
   
  }
  getToken() {
    return localStorage.getItem('token');
  }
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token; // Get token and asssign to variable to be used elsewhere
  }
  get loggedIn() {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  registerUser(user) {     
    return this.http.post(this.domain + '/api/register', user)
  }
  checkPhone(phone) {
    return this.http.get(this.domain + '/api/checkPhone/' + phone)
  }
  checkPhoneExist(phone) {
    const headers = new HttpHeaders({
      Authorization: `Bearer $2b$10$hL2tUqDm9c7SY8sMsb6jxedrlHTJ9EY.wJTF_yRdSY07vdcONksn6`,
    });
    return this.http.get('https://api-bot.prese.tech/api/prese/check-number-status/' + phone, { headers })
  }
  login(user) {
    console.log(user)
    return this.http.post(this.domain + '/api/login', user, { headers: this.headers })
  }
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }
  updateHorarioStatus(id){
    return this.http.put(this.domain + '/api/updateHorarioStatus/', id)
  }
  updateHorarioStatusChange(id){
    return this.http.put(this.domain + '/api/updateHorarioStatusChange/', id)
  }
  updatePedido(id){
    return this.http.put(this.domain + '/api/updatePedido/', id)
  }
  getProfile() {    
    return this.http.get(this.domain + '/api/profile', { headers: this.headers })
  }
}
