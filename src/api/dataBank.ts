import { Subject } from 'rxjs';
import {ActionType} from '../types'
const _ = require('lodash');
/**
 * 数据银行
 * @param reducer
 */

class CreateDataBank {
  private state = {};
  public subject = new Subject<any>();
  private hasModelReducer:boolean ;
  private modelReducer:Function;
  private reducer:Function;

  constructor(reducer:Function,initState?:any) {
    this.reducer = reducer;
    this.state = initState||{};
    this.hasModelReducer = false
  }

  getState = (key?:string) => {
    if (key) {
      return _.get(this.state, key);
    } else {
      return this.state;
    }
  };

  deleteModelData = (key:string) => {
    this.state = _.omit(this.state, [key]);
  }

  setOtherReducer = (fn:Function) => {
    this.hasModelReducer = true
    this.modelReducer = fn
  }

  dispatch = (action:{type:string,data:ActionType},isSubject:Boolean = true) => {
    this.state = this.reducer(this.state, action, this.hasModelReducer,this.modelReducer);

    // 优化：减少actionType分发
    if (isSubject) {
      // 推送消息
      this.subject.next({
        ...action,
        ...{
          state: this.state,
        },
      });
    }
  };
}

export default CreateDataBank;
