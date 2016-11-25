import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { removeMailDuty, assignMailDuty } from '../../api/mailDuties/methods.js';
import './laborMailDuty.html';
import {moment} from 'meteor/momentjs:moment';
import './laborMailDutyInfo.js';