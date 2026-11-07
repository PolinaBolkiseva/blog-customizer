import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from '../../constants/articleProps';

import type { ArticleStateType } from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
  const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
  const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);

  const [backgroundColor, setBackgroundColor] = useState(
    defaultArticleState.backgroundColor
  );
  const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (event: MouseEvent): void => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  return (
    <>
      <div ref={rootRef}>
        <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              onApply({
                fontFamilyOption: fontFamily,
                fontSizeOption: fontSize,
                fontColor,
                backgroundColor,
                contentWidth,
              });
              setIsOpen(false);
            }}
            onReset={(event) => {
              event.preventDefault();
              setFontFamily(defaultArticleState.fontFamilyOption);
              setFontSize(defaultArticleState.fontSizeOption);
              setFontColor(defaultArticleState.fontColor);
              setBackgroundColor(defaultArticleState.backgroundColor);
              setContentWidth(defaultArticleState.contentWidth);
              onApply(defaultArticleState);
            }}
          >
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>

            <Select
              title="шрифт"
              options={fontFamilyOptions}
              selected={fontFamily}
              onChange={setFontFamily}
            />

            <RadioGroup
              name="font-size"
              title="размер"
              options={fontSizeOptions}
              selected={fontSize}
              onChange={setFontSize}
            />
            <Select
              title="цвет шрифта"
              options={fontColors}
              selected={fontColor}
              onChange={setFontColor}
            />

            <Separator />

            <Select
              title="цвет фона"
              options={backgroundColors}
              selected={backgroundColor}
              onChange={setBackgroundColor}
            />
            <Select
              title="ширина контента"
              options={contentWidthArr}
              selected={contentWidth}
              onChange={setContentWidth}
            />
            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      </div>
    </>
  );
};
