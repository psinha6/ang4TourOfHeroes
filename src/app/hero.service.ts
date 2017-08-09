import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
@Injectable()

export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured' + error);
        return Promise.reject(error.message || error);
    }
    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
        .then(heroes => heroes.find(hero => hero.id === id));
    }
}
