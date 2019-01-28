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
      consumerKey: 'ck_1d485ebe40f44deb912ef99131ccd8b88c4ad126',
      consumerSecret: 'cs_114affdea44225ee9e822f483059db9ac5b100c5'
    });
  }

}
