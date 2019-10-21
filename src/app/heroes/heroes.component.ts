import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes'; not anymore, since we're using the service
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) {

  }
  
  heroes: Hero[];
  
  getHeroes(): void {
    // below works synchronously, but won't work if data is not returned immediately
    //this.heroes = this.heroService.getHeroes();
    // this instead
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  
  delete(hero: Hero): void {

    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();

  }
  

  ngOnInit() {

    this.getHeroes();

  }

}
