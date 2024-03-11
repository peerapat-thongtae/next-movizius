function onClickOutSide(listening: any, setListening: any, menuRef: any, setIsOpen: Function) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`]?.forEach(() => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef?.current?.contains(evt?.target)) return;
        setIsOpen(false);
      });
    });
  }
}

export default onClickOutSide;