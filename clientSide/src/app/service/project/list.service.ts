import {Injectable } from "@angular/core";
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { DELETE, GET, POST, PUT } from '../../../decorators/request.decorator';
import { MsgService } from '..';

@Injectable({providedIn : 'root'})
export class ListService {

  constructor(
    private http: HttpClient ,
    private msg : MsgService
  ) {
  }

  @GET(API.project.list )
  get(data: any): any {} ;


  @POST(API.project.list)
  post(data : any) : any {} ;


  @PUT(API.project.list)
  put( data : any ) : any {} ;

  @DELETE(API.project.list)
  delete( data : any ) : any {} ;
}
