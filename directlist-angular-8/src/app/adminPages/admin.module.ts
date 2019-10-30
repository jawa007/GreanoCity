import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { AdminDashboardlComponent } from './Dashboard/AdminDashboard.component';
import { MessagesComponent } from './Messages/Messages.component';
import { BookingsComponent } from './Bookings/Bookings.component';
import { ReviewsComponent } from './Reviews/Reviews.component';
import { BookmarksComponent } from './Bookmarks/Bookmarks.component';
import { ListComponent } from './List/List.component';
import { AddListComponent } from './AddList/AddList.component';
import { ProfileComponent } from './Profile/Profile.component';
import {FileSelectDirective} from "ng2-file-upload";
import { AdminRoutes } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddListingService } from './AddList/Add.listing.service';
import { InterceptorService } from './AddList/interceptor.service';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   // Change this to your upload POST address:
    paramName: "file",
    url: 'http://localhost:8080/upload',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };


@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminRoutes),
  ],
  declarations: [ 
    AdminDashboardlComponent,
    MessagesComponent,
    BookingsComponent,
    ReviewsComponent,
    BookmarksComponent,
    ListComponent,
    AddListComponent,
    ProfileComponent,
    FileSelectDirective
  ],
  providers: [
   {
     provide: DROPZONE_CONFIG,
     useValue: DEFAULT_DROPZONE_CONFIG
    },
    AddListingService,
    InterceptorService
 ]
})

export class AdminModule {}
