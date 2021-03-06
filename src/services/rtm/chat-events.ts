import {store} from '../../store/configureStore';
import {updateEntity} from '../../slices/entities-slice';
import {setTyping} from '../../slices/chats-thunks';
import {UserTypingEvent, ChatMarkedEvent} from './types';

export const handleChatsMarkedAsSeen = (data: ChatMarkedEvent) => {
  let chatId = data.channel;
  let dmCount = data.dm_count;
  let unreadCount = data.unread_count_display;
  store.dispatch(
    updateEntity({
      entity: 'chats',
      key: chatId,
      data: {
        dm_count: dmCount,
        unread_count: unreadCount,
      },
    }),
  );
};

export const handleUserTyping = (data: UserTypingEvent) => {
  let userId = data.user;
  let chatId = data.channel;
  store.dispatch(setTyping(userId, chatId) as any);
};
