import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

// @Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorModule } from "@core/http-interceptor/http-interceptor.module";
import { HeaderModule } from "@shared/components/header/header.module";

// @Component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpInterceptorModule,
    AppRoutingModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
