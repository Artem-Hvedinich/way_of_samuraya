import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Message/Message";
import {MessagePageType, sendMessageCreator} from "../../redax/dialogsReducer";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../redax/store";
import {AddMessageFormRedux} from "./AddNewMessage";
import {PATH} from "../RoutesWrapper/RoutersWrapper";

const Dialogs = ({isAuth}: { isAuth: boolean }) => {
    const messagesPage = useSelector<AppStoreType, MessagePageType>(s => s.messagesPage)
    const dispatch = useDispatch()

    let addNewMessage = (value: any) => {
        dispatch(sendMessageCreator({newMessageBody: value.newMessageBody}))
    }

    if (!isAuth)
        return <Navigate to={PATH.Login}/>


    return <div className={s.dialogs}>
        <div className={s.dialogsItems}>
            {messagesPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)}
        </div>
        <div className={s.messages}>
            <div>{messagesPage.messages.map(m => <Messages key={m.id} id={m.id} messages={m.message}/>)}</div>
            <div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    </div>;
}
export default Dialogs
