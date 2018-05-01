

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getATask("5ace8859b3c8884966e8319c");
    // this.getPokemon();
  }

  addTask(newtask) {
    console.log(newtask+"1")
    return this._http.post('/task', newtask)
  }

  getTasks() {
    // // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/tasks');
    // // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks');
  }

  removeTask(task){

    return this._http.delete('/tasks/remove/' + task._id)
  }

  editTask(editTask) {

    return this._http.put('/task/edit/'+ editTask._id, editTask)
  }

  getATask(id) {
    // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/tasks/' + id);
    // // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got that task!", data));
      
  }
  // getPokemon() {
  //   let pikachu = this._http.get('https://pokeapi.co/api/v2/pokemon/25/');

  //   let ability;
  //   let ability2;

  //   pikachu.subscribe(data => {
  //     console.log(data)
  //     console.log("Pikachu's abilities are " + data["abilities"][0]["ability"]["name"] + " and " + data["abilities"][1]["ability"]["name"]);

  //     ability = data["abilities"][0]["ability"]
  //     ability2 = data["abilities"][1]["ability"]
  //     console.log(ability)

  //       let a1 = this._http.get(ability["url"]);
  //       a1.subscribe(data => {
  //         console.log(data.pokemon.length)
  //       })

  //     let a2 = this._http.get(ability2["url"]);
  //     a2.subscribe(data => {
  //       console.log(data.pokemon.length)
  //     })
        
    
  //   })

  // }
}