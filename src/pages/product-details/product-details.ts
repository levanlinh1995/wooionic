import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WoocommerceApiProvider } from './../../providers/woocommerce-api/woocommerce-api';


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
    private wooApi: WoocommerceApiProvider
    ) {
    this.product = this.navParams.get('product');

    this.wooApi.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);
    }, (error) => {
      console.log(error);
    });

    console.log(this.product);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
