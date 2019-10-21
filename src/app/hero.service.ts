import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
// include this instead
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  getHeroes(): Observable<Hero[]> {
    // TODO: send message __after__ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    // of() is involved in the asynchronous operations of the service
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  /*
  getHero(id: number): Observable<Hero> {

    //TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return; // of(HEROES.find(hero => hero.id === id));

  }
*/
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web api



  constructor(private messageService: MessageService,
    private http: HttpClient) { }
}
