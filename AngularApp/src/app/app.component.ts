import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTask: any;
  title = 'app'
  tasks = [];
  task = {}
  showEdit = false;
  errors = [];
 

  constructor(private _httpService: HttpService) { };


  ngOnInit() {
    this.newTask = { title: "", desc: "" }

    this.getTasksFromService()
    
    
  }


  onSubmit() {
    // Code to send off the form data (this.newTask) to the Service
    this.errors = []
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log(data)
      if ((data as any).message == "Error") {
        if (data["error"]["title"]["message"]){
          this.errors.push(data["error"]["title"]["message"])
        }
        if (data["error"]["desc"]["message"]) {
          this.errors.push(data["error"]["desc"]["message"])
        }
        console.log(this.errors)
      }
    // Reset this.newTask to a new, clean object.
    console.log("2" + this.newTask)
    
    this.newTask = { title: "", desc: "" }
    this.getTasksFromService()
      
    })

  }



  // getATaskFromService(id) {
  //   console.log(id)
  //   let observable = this._httpService.getATask(id);
  //   observable.subscribe(data => {
  //     console.log("Got that task!", data)

      
  //     this.task = data["data"]
  //   })
  // }

  getATaskFromService(id) {
    console.log(id)
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got that task!", data)

      id -= 1
      this.task = data["data"][id]
    })
  }


  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      
      this.tasks = data["data"]
    })
  }

  deleteATaskFromService(task) {
    let observable = this._httpService.removeTask(task);
    observable.subscribe(data => {
      console.log("deleted!", data)
      this.getTasksFromService()
      this.showEdit = false;
    })
  }

  editATaskFromService(editTask) {
    let observable = this._httpService.getATask(editTask._id);
    observable.subscribe(data => {
      console.log("editted!", data)
      if ((data as any).message == "Success") {
        this.task = (data as any).data
        this.showEdit = true;
      }
      else {
        this.task = undefined
      }
    })
  }

  saveATaskFromService() {
    this.errors =[];
    if (this.task["title"] == "" || this.task["desc"] == ""){
      this.errors.push("Title/ Description cannont be empty!")
    }
    else {
      let observable = this._httpService.editTask(this.task);
      observable.subscribe(data => {
        console.log("save12335432624573568546384678567895678567846784567" + data["error"])
        this.getTasksFromService()
      })
      this.task = { title: "", description: "" }
      this.getTasksFromService()
      this.showEdit = false
    }
  }




  // onButtonClick(): void {
  //   console.log(`Click event is working`);
  // }
  // onButtonClickParam(num: Number): void {
  //   console.log(`Click event is working with num param: ${num}`);
  // }
  // onButtonClickParams(num: Number, str: String): void {
  //   console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  // }
  // onButtonClickEvent(event: any): void {
  //   console.log(`Click event is working with event: `, event);
  // }
}
