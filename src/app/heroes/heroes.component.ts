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

  heroes: Hero[];
  
  getHeroes(): void {
    // below works synchronously, but won't work if data is not returned immediately
    //this.heroes = this.heroService.getHeroes();
    // this instead
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroService: HeroService) {

   }

  ngOnInit() {

    this.getHeroes();

  }

}
