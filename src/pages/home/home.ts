import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import { WoocommerceApiProvider } from './../../providers/woocommerce-api/woocommerce-api';
import { ProductDetailsPage } from './../product-details/product-details';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('productSlides') productSlides: Slides;

  page:number = 2;
  WooCommerce: any;
  products: any[];
  loadedMoreProducts: any[];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private wooApi: WoocommerceApiProvider
    ) {
    this.loadSliderProducts();
    this.loadMoreProducts(null);
  }

  ionicViewDidLoad() {
    setInterval(() => {
      if (this.productSlides.getActiveIndex() == (this.productSlides.length() - 1)) {
        this.productSlides.slideTo(0);
      }

      this.productSlides.slideNext();
    }, 3000);
  }

  loadSliderProducts() {
    this.wooApi.WooCommerce.getAsync('products').then((data) => {
      this.products = JSON.parse(data.body).products;
    }, (error) => {
      console.log(error);
    });
  }

  loadMoreProducts(event: any) {
    if (event) {
      this.page++;
    } else {
      this.page = 2;
      this.loadedMoreProducts = [];
    }
    this.wooApi.WooCommerce.getAsync('products?page=' + this.page).then((data) => {
      this.loadedMoreProducts = this.loadedMoreProducts.concat(JSON.parse(data.body).products);

      if (event) {
        event.complete();

        if (JSON.parse(data.body).products.length < 10) {
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
