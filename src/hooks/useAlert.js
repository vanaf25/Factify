// useAlert.js
import { useState } from 'react';

const useAlert = () => {
    const [show, setShow] = useState(false);
    const [mainText, setMainText] = useState('');
    const [text, setText] = useState('');

    const triggerAlert = (mainText, text) => {
        setMainText(mainText);
        setText(text);
        setShow(true);
    };

    const onClose = () => {
        setShow(false);
    };

    return {
        show,
        mainText,
        text,
        triggerAlert,
        onClose,
    };
};

export default useAlert;
