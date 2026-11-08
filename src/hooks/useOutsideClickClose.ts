import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseOutsideClickClose = {
  isOpen: boolean;
  onChange: (newValue: boolean) => void;
  rootRef: RefObject<HTMLDivElement | null>;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onChange,
}: UseOutsideClickClose): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent): void => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onChange(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onChange, rootRef]);
};
