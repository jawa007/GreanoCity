import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AddListing } from "../model/AddListing.model";
import 'rxjs/add/operator/toPromise';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class AddListingService {

    constructor(private http:HttpClient) {}

    private listUrl = 'http://localhost:8080/listing';
 
    public addListing(addListing): Promise<AddListing> {
        return this.http.post<AddListing>(this.listUrl, JSON.stringify(addListing),httpOptions)
        .toPromise()
        .then(response => {
          console.log("Response:"+JSON.stringify(response));
        })
        .catch(this.handleError);
    }

    updateListing(addListing: AddListing): Promise<AddListing> {
      console.log("Inside update:"+JSON.stringify(addListing))
      return this.http.put(this.listUrl + '/' + addListing.id, addListing)
        .toPromise()
        .then(response => {
          console.log("Response:"+response);
         })
        .catch(this.handleError);
    }
 
    private handleError(error: any): Promise<any> {
      console.error('Error', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}