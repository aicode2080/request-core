import { Subject } from 'rxjs';
import { ActionType } from '../types';
/**
 * 数据银行
 * @param reducer
 */
declare class CreateDataBank {
    private state;
    subject: Subject<any>;
    private hasModelReducer;
    private modelReducer;
    private reducer;
    constructor(reducer: Function, initState?: any);
    getState: (key?: string | undefined) => any;
    deleteModelData: (key: string) => void;
    setOtherReducer: (fn: Function) => void;
    dispatch: (action: {
        type: string;
        data: ActionType;
    }, isSubject?: Boolean) => void;
}
export default CreateDataBank;
