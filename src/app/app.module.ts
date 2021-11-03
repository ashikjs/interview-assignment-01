import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// @Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorModule } from "@core/http-interceptor/http-interceptor.module";

// @Component
import { AppComponent } from './app.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
