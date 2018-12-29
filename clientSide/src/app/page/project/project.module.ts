import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { SharedModule } from '../../shared/shared.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { ConfigComponent } from './config/config.component';
import { ListCompnent } from './list/list.compnent';

const routes  : Routes = [
  { path: "config", component: ConfigComponent, data: { title: "产品配置", titleI18n: "产品配置" } },
  { path: "list/:id", component: ListCompnent, data: { title: "mock", titleI18n: "mock" } },
];

const component = [
  ConfigComponent ,
  ListCompnent
];
@NgModule({
	declarations : [
		...component
	],
	imports: [
    SharedModule,
		NgZorroAntdModule,
		RouterModule.forChild(routes)
	],
	providers: [],
	bootstrap: []
})
export class ProjectModule { };
