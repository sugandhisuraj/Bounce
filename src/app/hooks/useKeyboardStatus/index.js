import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const handler = status => setIsKeyboardOpen(status);
  useEffect(() => {
    let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setEvent(e);
      handler(true);
    });
    let keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e => {
      setEvent(null);
      handler(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }
  return [isKeyboardOpen, event,hideKeyboard];
};

export default useKeyboardStatus;
