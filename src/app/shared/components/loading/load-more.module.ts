import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadMoreComponent } from "./load-more.component";

@NgModule({
  imports: [CommonModule],
  declarations: [LoadMoreComponent],
  exports: [LoadMoreComponent]
})
export class LoadMoreModule {
}
