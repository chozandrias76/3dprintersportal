/**
 * Created by colin on 12/7/16.
 */
import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import TopModelsType from '../types/TopModelsType';

const url = 'https://api.thingiverse.com/popular/?access_token=33c4a53f6f6244c03008cf5f40e6e109';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const topmodels = {
  type: new List(TopModelsType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {
          /*if (data.responseStatus === 200) {
            items = data;
          }*/
          items = data;
          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default topmodels;
