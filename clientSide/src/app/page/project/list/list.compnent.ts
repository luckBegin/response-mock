import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../service';
import { ActivatedRoute } from '@angular/router';
import { DateUtils, ObjectUtils } from '@shared/utils';
import { QueryModel } from './query.mode';
import { ListService } from '../../../service/project/list.service';
import { Observable } from 'rxjs';
import { ENUM, RESPONSE } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../../decorators/service.decorator';

@Component({
  selector : "project-list",
  templateUrl : './list.component.html' ,
  styleUrls : ['./list.component.less']
})
export class ListCompnent implements  OnInit{
  constructor(
    private msg :MsgService ,
    private router : ActivatedRoute ,
    private service : ListService ,
    private fb : FormBuilder
  ){} ;

  ngOnInit(): void {
    this.projectId = this.router.snapshot.params['id'] ;
    this.getList() ;
    this.searchBarData.conditions[1].data = this.requestMehod ;
  };

  projectId : number ;

  queryModel : QueryModel = new QueryModel ;

  formShow : boolean = false ;

  editMark : boolean = false ;

  isVisible : boolean = false ;

  form : FormGroup = this.fb.group({
    id : [null] ,
    url : [null , [Validators.required]] ,
    method : [null , [Validators.required ]] ,
    statusCode : [null , [Validators.required]] ,
    remark : [null , Validators.required ] ,
    response : [null , [ Validators.required] ] ,
    projectId : [null]
  });


  tableData = {
    loading: true,
    page: 1,
    total : 0 ,
    columns: [
      { title: '请求地址', type: 'text', reflect: 'url' },
      { title: '请求方法', type: 'mark', reflect: 'method' },
      { title: '状态码', type: 'text', reflect: 'statusCode' },
      { title: '备注', type: 'text', reflect: 'remark' },
      { title: '创建时间', type: 'text', reflect: 'createTime' , filter : (item) => {
          return DateUtils.format(item.createTime , 'y-m-d') ;
      }},
    ],
    data: [],
    btn: {
      title: '操作',
      items: [{
        type: 'edit',
        title: '编辑',
        fn: (data) => {
          this.editMark = true ;
          this.formShow = true ;
          this.form.patchValue(data) ;
        },
      },{
        type: 'del',
        title: '删除',
        fn: (data) => {
          this.isVisible = true ;
          this.form.patchValue(data) ;
        },
      }],
    },
    change : (type : string , size : number ) => {
      if(type === 'size')
        this.queryModel.pageSize = size ;
      if(type === 'page')
        this.queryModel.currentPage = size ;
      this.getList() ;
    }
  };

  requestMehod : ENUM[] = [
    { key : "GET" , value : "GET"} ,
    { key : "POST" , value : "POST"} ,
    { key : "PUT" , value : "PUT"} ,
    { key : "PATCH" , value : "PATCH"} ,
    { key : "DELETE" , value : "DELETE"} ,
  ];

  searchBarData = {
    conditions: [
      { name: '请求地址', type: 'input' , model : "url" , placeHolder: '请输入请求地址'},
      { name: '请求方法', type: 'select' , data : [] , default : "null", model : "enabled" , placeHolder: '是否启用' },
    ],
    notify : {
      query : ( data : QueryModel ) =>  { this.queryModel = ObjectUtils.extend(this.queryModel , data)  as QueryModel ; this.getList();  },
      reset : ( data : QueryModel ) => { this.queryModel = new QueryModel ; this.getList(); } ,
    }
  };

  getList(){
    this.queryModel.projectId = this.projectId ;
    (this.service.get(this.queryModel) as Observable< RESPONSE >)
      .subscribe( ( res : RESPONSE) => {

        this.tableData.loading = false ;

        this.tableData.data =res.data ;

        if(res.page)
          this.tableData.total = res.page.totalNumber ;

      } ,err => {
        this.tableData.loading = false ;
      })
  };

  add(){
    this.editMark = false ;
    this.formShow = true ;
    this.form.reset() ;
    this.form.patchValue({
      projectId : this.projectId
    });
  };

  @Service("service.post" , true ,function(){
    const data = this.form.value ;
    return data ;
  })
  makeNew($event){
    this.msg.success("添加成功") ;
    this.formShow = false ;
    this.getList() ;
  };

  @Service("service.put" , true ,function(){
    const data = this.form.value ;
    data.projectId = this.projectId ;
    return data ;
  })
  save($event){
    this.msg.success("保存成功");
    this.formShow = false ;
    this.getList() ;
  };

  @Service('service.delete' , true , function(){
    return this.form.value ;
  })
  modalConfirm($event){
    this.msg.success("删除成功") ;
    this.isVisible = false ;
    this.getList();
  };
}
