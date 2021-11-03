import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// @Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorModule } from "@core/http-interceptor/http-interceptor.module";

// @Component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpInterceptorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
