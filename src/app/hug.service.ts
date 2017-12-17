import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Hospital, Month, Year} from './hug';
import {MONTHS} from './data-model';

@Injectable()
export class HugService {

    private hospitalsUrl = 'http://seagate.dev/api/hospitals/2';  // URL to web api
    private yearsUrl = 'http://seagate.dev/api/years';  // URL to web api
    private reportNassauUrl = 'http://seagate.dev/api/hug/nassau'; 

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getMonths(): Observable<Month[]> {
        return of(MONTHS);
    }

    getYears(): Observable<Year[]> {
        this.log('HugService: Fetched Year listing');
        return this.http.get<Year[]>(this.yearsUrl)
            .pipe(
                tap(years => this.log('fetched years')),
                catchError(this.handleError('getYears', []))
              );
    }

    getHospitals(): Observable<Hospital[]> {
        this.log('HugService: Fetched Hospitals lists');
        return this.http.get<Hospital[]>(this.hospitalsUrl)
            .pipe(
                tap(hospitals => this.log('fetched hospitals')),
                catchError(this.handleError('getHospitals', []))
              );
        //return of(HOSPITALS);
    }

    saveHugForm(data): void {
        console.log(JSON.stringify(data));
        this.http.post(this.reportNassauUrl, data, {
            headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
        });
    }

    /** Log a HugService message with the MessageService */
    private log(message: string) {
      this.messageService.add('HugService: ' + message);
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}