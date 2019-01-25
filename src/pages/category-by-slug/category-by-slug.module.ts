import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryBySlugPage } from './category-by-slug';

@NgModule({
  declarations: [
    CategoryBySlugPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryBySlugPage),
  ],
})
export class CategoryBySlugPageModule {}
