import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


@Injectable()
export class HeroService {

    private url = "http://localhost:3000/tour-of-heroes/heroes";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(
            heroes => heroes.find(hero => hero.id === id)
        );
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.url}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(()=>hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}