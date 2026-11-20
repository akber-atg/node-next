'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './dialog_general.module.css';

interface OfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function OfferDialog({
  isOpen,
  onClose,
  title,
  description,
}: OfferDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Trigger the exit animation first, then notify parent to close
  const triggerClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    // Wait 400ms for the flyLeftOut animation to finish
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        setIsClosing(false);
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      triggerClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        // Prevent instant close on Esc so the animation can play
        e.preventDefault();
        triggerClose();
      }}
      onClick={handleBackdropClick}
      className={`${styles.dialog} ${isClosing ? styles.closing : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button
            onClick={triggerClose}
            className={styles.closeBtn}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        <div className={styles.body}>
          <p>{description}</p>
        </div>

        <div className={styles.footer}>
          <button onClick={triggerClose} className={styles.actionBtn}>
            Got it
          </button>
        </div>
      </div>
    </dialog>
  );
}