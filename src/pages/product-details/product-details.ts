import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WoocommerceApiProvider } from './../../providers/woocommerce-api/woocommerce-api';
import { CartPage } from './../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wooApi: WoocommerceApiProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    this.product = this.navParams.get('product');
    console.log(this.product);


    this.wooApi.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
      this.reviews = JSON.parse(data.body).product_reviews;
    }, (error) => {
      console.log(error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  addToCart(product) {
    this.storage.get('cart').then((data) => {
      if (data === null || data.length === 0) {
        let data = [];
        data.push({
          product: product,
          qty: 1,
          amount: parseFloat(product.price)
        });

        this.storage.set('cart', data).then(() => {
          console.log('cart updated');
          console.log('cart:', data);
          this.presentUpdatedCartNotification();
        });

      } else {
        let added = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].product.id === product.id) {
            data[i].qty++;
            data[i].amount = data[i].amount + parseFloat(product.price)

            added = 1;
          };
        }

        if (added === 0) {
          data.push({
            product: product,
            qty: 1,
            amount: parseFloat(product.price)
          });
        }

        this.storage.set('cart', data).then(() => {
          console.log('cart updated');
          console.log('cart:', data);
          this.presentUpdatedCartNotification();
        });
      }
    });
  }

  presentUpdatedCartNotification() {
    const toast = this.toastCtrl.create({
      message: 'Cart updated!',
      duration: 3000
    });

    toast.present();
  }

  goToCart() {
    const modal = this.modalCtrl.create(CartPage);
    modal.present();
  }

}
