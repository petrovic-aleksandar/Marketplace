import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  getApi (path:string) {
    //return "https://localhost:5001/api/" + path + "/"
    return "http://localhost:8080/marketplace-java/api/v1/" + path + "/"
  }

  getImagePath(path:string) {
    return "http://localhost:80/"+ path
  }
   
  
}
