import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutesModule } from './roles-routes.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ShareModule } from 'src/app/rbac/share/share.module';
import { AuToolModule } from 'src/app/rbac/share/tool/tool.module';
import { AuAdaptionModule } from 'src/app/rbac/share/adaption/adaption.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { NgNestModule } from 'src/app/rbac/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    RolesRoutesModule
  ],
  declarations: [RolesComponent, RoleDetailComponent, RolePermissionComponent]
})
export class RolesModule {}
