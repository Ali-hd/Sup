import React, {useContext, useState, FC} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {EmojiData} from 'emoji-mart';

import px from '../../utils/normalizePixel';
import Composer from './Composer';
import Send from './Send';
import * as RTM from '../../services/rtm';
import EmojiButton from './EmojiButton';
import ThemeContext from '../../contexts/theme';
import FileUploadButton from './FileUploadButton';
import VoiceRecording from './VoiceRecording';

type Props = {
  chatId: string;
  threadId: string;
};

const InputToolbar: FC<Props> = React.memo(({chatId, threadId}) => {
  const [text, setText] = useState('');
  const {theme} = useContext(ThemeContext);
  const isVoice = !text || text.length === 0;
  const [voiceRecording, setVoiceRecording] = useState(false);

  const handleTextChanged = (text: string) => setText(text);

  const startVoiceRecording = () => {
    setVoiceRecording(!voiceRecording);
  };

  const handleSendPress = () => {
    if (isVoice) {
      startVoiceRecording();
    } else {
      if (!text) return;
      RTM.sendMessage({
        type: 'message',
        text,
        channel: chatId,
        thread_ts: threadId,
      });
      setText('');
    }
  };

  const handleEmojiSelected = (emoji: EmojiData) => setText(text + emoji.native);

  const renderComposer = () => (
    <Composer
      text={text}
      onTextChanged={handleTextChanged}
      isThread={!!threadId}
      onEnter={handleSendPress}
    />
  );

  const renderSend = () => <Send onPress={handleSendPress} isVoice={isVoice} />;

  const renderEmojiButton = () => <EmojiButton onEmojiSelected={handleEmojiSelected} />;

  const renderFileUploadButton = () => <FileUploadButton chatId={chatId} threadId={threadId} />;

  const renderVoiceRecordingArea = () => <VoiceRecording />;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {voiceRecording ? (
          renderVoiceRecordingArea()
        ) : (
          <View style={[styles.emojiAndComposeWrapper, {backgroundColor: theme.backgroundColor}]}>
            {renderEmojiButton()}
            {renderComposer()}
            {renderFileUploadButton()}
          </View>
        )}
        {renderSend()}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: px(5),
    alignItems: 'flex-end',
    paddingBottom: px(7.5),
    height: '100%',
  },
  emojiButton: {
    borderRadius: px(15),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: px(10),
    paddingBottom: Platform.select({ios: px(7.5), web: px(7.5), default: px(11)}),
  },
  emojiAndComposeWrapper: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    flex: 1,
    borderRadius: px(20),
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default InputToolbar;
