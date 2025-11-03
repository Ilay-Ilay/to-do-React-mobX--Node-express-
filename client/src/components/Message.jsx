import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { createPortal } from "react-dom";

const Message = observer(() => {
  const { MessageStore } = useContext(Context);

  if (!MessageStore.isOpen) return null;

  const { isError, message } = MessageStore;

  return createPortal(
    <div className="message-container">
      <div className={`message ${isError === true ? "error" : "success"}`}>
        {message}
      </div>
    </div>,
    document.getElementById("message-root")
  );
});

export default Message;
