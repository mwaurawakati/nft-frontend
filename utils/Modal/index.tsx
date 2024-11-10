import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { CSSTransition } from "react-transition-group";
import { useHotkeys } from "react-hotkeys-hook";
import { use100vh } from "react-div-100vh";
import cn from "classnames";
import styles from "./Modal.module.sass";
import Icon from "@/components/Icon";

type ModalProps = {
    className?: string;
    closeClassName?: string;
    containerClassName?: string;
    visible: boolean;
    onClose?: any;
    children: React.ReactNode;
};

const Modal = ({
    className,
    containerClassName,
    closeClassName,
    visible,
    onClose,
    children,
}: ModalProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useHotkeys("esc", onClose, { enableOnTags: ["INPUT", "TEXTAREA"] });

    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            visible ? disablePageScroll() : enablePageScroll();
        }
    }, [visible]);

    useEffect(() => setLoaded(true), []);

    const ref = useRef(null);

    const height: any = use100vh();

    return loaded
        ? createPortal(
              <CSSTransition
                  classNames={"modal"}
                  in={visible}
                  timeout={400}
                  nodeRef={ref}
                  unmountOnExit
              >
                  <div
                      className={cn("rey-modal", styles.modal, className)}
                      onClick={onClose}
                      data-scroll-lock-scrollable
                      data-scroll-lock-fill-gap
                      ref={ref}
                  >
                      <div
                          className={cn(
                              "modal-container",
                              styles.container,
                              containerClassName
                          )}
                          onClick={(e) => e.stopPropagation()}
                          style={{ minHeight: height }}
                      >
                          {children}
                      </div>
                      {onClose && (
                          <button
                              className={cn(
                                  "button-circle",
                                  styles.close,
                                  closeClassName
                              )}
                              onClick={onClose}
                          >
                              <Icon name="close-fat" />
                          </button>
                      )}
                  </div>
              </CSSTransition>,
              document.body
          )
        : null;
};

export default Modal;
