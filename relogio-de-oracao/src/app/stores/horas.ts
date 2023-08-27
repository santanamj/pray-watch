
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Horas } from "../model/hora";


export interface State {
    horas: Horas[];    
}
const state: State = {
    horas: []    
}
export class StoreHoras {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable();

    get value(){
       
        return this.subject.value
    }
    set(name: string, state: any) {       
        this.subject.next({
            ...this.value, [name]: state
        })
    }
    public getHoras(): Observable<Horas[]>{       
        return this.store.pipe(map(store => store.horas))
    }
}