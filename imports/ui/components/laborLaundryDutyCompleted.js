import { Template } from 'meteor/templating';
import { LaundrDuties } from '../../api/laundryDuties/laundryDuties.js';
import { removeLaundryDuty, assignLaundryDuty } from '../../api/laundryDuties/methods.js';
import './laborLaundryDuty.html';
import {moment} from 'meteor/momentjs:moment';
import './laborLaundryDutyInfo.js';