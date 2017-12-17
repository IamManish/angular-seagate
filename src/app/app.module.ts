import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';
import { HugService } from './hug.service';
import { MessageService } from './message.service';

import { AppComponent } from './app.component';
import { HugNassauComponent } from './hug-nassau/hug-nassau.component';
import { HugPandionComponent } from './hug-pandion/hug-pandion.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HugNassauComponent,
    HugPandionComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports
    HttpClientModule, AppRoutingModule
  ],
  providers: [HugService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
