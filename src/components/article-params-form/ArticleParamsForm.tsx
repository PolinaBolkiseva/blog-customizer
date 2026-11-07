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

import type { ArticleStateType, OptionType } from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleChange =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState({ ...formState, [field]: option });
    };

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
              onApply(formState);
              setIsOpen(false);
            }}
            onReset={(event) => {
              event.preventDefault();
              setFormState(defaultArticleState);
              onApply(defaultArticleState);
            }}
          >
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>

            <Select
              title="шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={handleChange('fontFamilyOption')}
            />

            <RadioGroup
              name="font-size"
              title="размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={handleChange('fontSizeOption')}
            />
            <Select
              title="цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={handleChange('fontColor')}
            />

            <Separator />

            <Select
              title="цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={handleChange('backgroundColor')}
            />
            <Select
              title="ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={handleChange('contentWidth')}
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
