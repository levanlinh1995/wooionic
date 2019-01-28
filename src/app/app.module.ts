import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MenuPage } from './../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { CategoryBySlugPage } from './../pages/category-by-slug/category-by-slug';
import { ProductDetailsPage } from './../pages/product-details/product-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WoocommerceApiProvider } from '../providers/woocommerce-api/woocommerce-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    CategoryBySlugPage,
    ProductDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    CategoryBySlugPage,
    ProductDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceApiProvider
  ]
})
export class AppModule {}
