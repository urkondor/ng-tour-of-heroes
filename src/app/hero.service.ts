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

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  private heroesUrl = 'api/heroes'; // URL to web api
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
        .pipe(
          tap(_ => this.log('fetched heroes')), // so... just logging
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }
  
  getHero(id: number): Observable<Hero> {
    
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    //TODO: send the message _after_ fetching the hero; not needed if logging proper
    //this.messageService.add(`HeroService: fetched hero id=${id}`);

  }

  // a PUT request - update existing record on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST request
  addHero(hero: Hero):  Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
        .pipe(tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
        );
  }

  // DELETE request
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
        .pipe(tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
        );
  }

  // now a search capability
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) { return of([]); }  // if no search tearm, just return empty array
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

      

  
}
