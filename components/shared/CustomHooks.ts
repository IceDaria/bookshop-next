import { useState } from 'react';

function useLoginPopupToggle(): [boolean, () => void] {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    const toggleLoginPopup = () => {
        setIsLoginPopupOpen(prevState => !prevState);
    };

    return [isLoginPopupOpen, toggleLoginPopup];
}

export default useLoginPopupToggle;