import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborShoppingDuty.html';
import {moment} from 'meteor/momentjs:moment';
import './laborShoppingDutyInfo.js';