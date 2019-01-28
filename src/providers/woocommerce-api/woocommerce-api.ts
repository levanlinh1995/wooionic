import { Injectable } from '@angular/core';

import * as WC from 'woocommerce-api';

/*
  Generated class for the WoocommerceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WoocommerceApiProvider {
  WooCommerce: any;

  constructor() {
    this.WooCommerce = new WC({
      url: 'http://wooionic.test',
      consumerKey: 'ck_65ec114a1601ca4bdc9ece6627e7fbd49c28f821',
      consumerSecret: 'cs_6eb95278e72406b0174c33b95d01cdec4496641c'
    });
  }

}
