import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from './../product-details/product-details';

@Component({
  selector: 'page-category-by-slug',
  templateUrl: 'category-by-slug.html',
})
export class CategoryBySlugPage {
  category: any;
  page = 1;
  WooCommerce: any;
  products: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.category = this.navParams.get('category');

    this.WooCommerce = new WC({
      url: 'http://wooionic.test',
      consumerKey: 'ck_1d485ebe40f44deb912ef99131ccd8b88c4ad126',
      consumerSecret: 'cs_114affdea44225ee9e822f483059db9ac5b100c5'
    });

    this.loadProducts(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryBySlugPage');
  }

  loadProducts(event) {
    if (event) {
      this.page++;
    }

    this.WooCommerce.getAsync('products?page=' + this.page + '&filter[slug]=' + this.category.slug).then((data) => {
      let temp: any[] = JSON.parse(data.body).products;
      
      this.products = this.products.concat(temp);

      if (event) {
        event.complete();

        if (temp.length <  10) {
          event.enable(false);
          this.presentNoMoreData();
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  presentNoMoreData() {
    const toast = this.toastCtrl.create({
      message: 'No more data!',
      duration: 3000
    });
    
    toast.present();
  }

  goToProductDetailPage(product) {
    this.navCtrl.push(ProductDetailsPage, {
      product: product
    });
  }

}
