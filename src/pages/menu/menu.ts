import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { CategoryBySlugPage } from './../category-by-slug/category-by-slug';
import { HomePage } from './../home/home';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild('content') nav: NavController
  
  homePage: any = HomePage;
  WooCommerce: any;
  categories: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.WooCommerce = new WC({
      url: 'http://wooionic.test',
      consumerKey: 'ck_1d485ebe40f44deb912ef99131ccd8b88c4ad126',
      consumerSecret: 'cs_114affdea44225ee9e822f483059db9ac5b100c5'
    });

    this.loadCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  loadCategories() {
    this.WooCommerce.getAsync('products/categories').then((data) => {
      let temp: any[] = JSON.parse(data.body).product_categories;

      temp.forEach(element => {
        if (element.parent === 0 && element.slug !== 'uncategorized') {
          if (element.slug === 'clothing') {
            element.icon = 'shirt';
          } else if (element.slug === 'music') {
            element.icon = 'musical-notes'
          } else if (element.slug === 'decor') {
            element.icon = 'add-circle'
          }

          this.categories.push(element);
        }  
      });
    }, (error) => {
      console.log(error);
    });
  }

  goToCategoryPage(category: any) {
    this.nav.setRoot(CategoryBySlugPage, {
      category: category
    });
  }

}
