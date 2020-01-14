import { createObjectChangeMessage, createAddMessage } from '../../../redux/MessageDialogReduce';
import ItemMessages from './itemMessages';
import { connect } from 'react-redux';
import { withAuthentication } from '../../Hoc/withAUHoc';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


const mapState = (state) => {
    return {
        printDialogText: state.dialogs.printDialogText,
        messagesMap: state.dialogs.messagesMap
    }
}

const mapDispatch = (dispatch) => {
    return {
        onCheckMessageTextFn(body){
            let text = body.target.value;
            dispatch(createObjectChangeMessage(text));
        },
        onAddMessageTextFn(){
            dispatch(createAddMessage());
        }
    }
}

export default compose(
    connect(mapState,mapDispatch),
    withRouter,
    withAuthentication
  )
  (ItemMessages);
