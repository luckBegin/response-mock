import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../service';
import { QueryModel } from './query.mode';
import { DateUtils, ObjectUtils } from '@shared/utils';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ngIfAnimation } from '../../../routes/router-animation';
import { Service } from '../../../../decorators/service.decorator';
import { ProjectService } from '../../../service/project';
import { Observable } from 'rxjs';
import { RESPONSE } from '../../../models';
import { validate } from 'codelyzer/walkerFactory/walkerFn';
@Component({
  selector : 'product-config' ,
  templateUrl : './config.component.html' ,
  styleUrls : ['./config.component.less'] ,
  animations : [ ngIfAnimation ]
})
export class ConfigComponent implements OnInit{
  constructor(
    private msg :MsgService ,
    private fb : FormBuilder ,
    private service : ProjectService
  ){};

  ngOnInit(): void {
    this.getList();

  };
  queryModel : QueryModel = new QueryModel ;

  formShow :boolean = false ;

  editMark : boolean = false ;

  form : FormGroup = this.fb.group({
    projectName : [null , [Validators.required]] ,
    remark : [null , [Validators.required]] ,
    enable : [ null , [Validators.required]] ,
    id : [null]
  });
  tableData = {
    loading: true,
    page: 1,
    total : 0 ,
    columns: [
      { title: '项目编号', type: 'text', reflect: 'id' },
      { title: '项目名称', type: 'text', reflect: 'projectName' },
      { title: '备注', type: 'text', reflect: 'remark' },
      {
        title: '启用', reflect: 'enable', type: 'switch', filter: (column) => {
          return column.enable === 1;
        }, fn: (data) => {
          this.changeStatus(data);
        },
      },
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
            this.formShow = true ;
            this.editMark = true ;
            this.form.patchValue(data) ;
          },
        },
      ],
    },
    change : (type : string , size : number ) => {
      if(type === 'size')
        this.queryModel.pageSize = size ;
      if(type === 'page')
        this.queryModel.currentPage = size ;
      this.getList() ;
    }
  };

  searchBarData = {
    conditions: [
      { name: '项目名称', type: 'number' , model : "projectName" , placeHolder: '请输入项目名称'},
      { name: '启用', type: 'select' , data : [ { key : "启用" , value : 1} , { key : "停用" , value : 0}] , default : "null", model : "enabled" , placeHolder: '是否启用' },
    ],
    notify : {
      query : ( data : QueryModel ) =>  { this.queryModel = ObjectUtils.extend(this.queryModel , data)  as QueryModel ; this.getList();  },
      reset : ( data : QueryModel ) => { this.queryModel = new QueryModel ; this.getList(); } ,
    }
  };

  getList() : void{
    this.tableData.loading = true ;
    (< Observable<any> >this.service.get(this.queryModel))
      .subscribe( (res : RESPONSE) => {
        this.tableData.loading = false ;
        this.tableData.data = res.data ;

        if(res.page)
          this.tableData.total = res.page.totalNumber ;

      } , err => {
        this.tableData.loading = false ;
      })
  };

  add(){
    this.formShow = true ;
    this.editMark = false ;
    this.form.reset() ;
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
    return data ;
  })
  save($event){
    this.msg.success("保存成功");
    this.formShow = false ;
    this.getList() ;
  };

  changeStatus(data) {
    const postData = {
      id :  data.id ,
      enable : data.enable === 1 ? 0 : 1
    };

    (this.service.put( postData ) as Observable<any>)
      .subscribe( ( res : RESPONSE ) => {
        data.enable = data.enable === 1 ? 0 : 1 ;
        this.msg.success("修改成功") ;
      } , err => {

      });
  };
};
