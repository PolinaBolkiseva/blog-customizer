import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useOutsideClickClose } from '@hooks/useOutsideClickClose';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleChange =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState({ ...formState, [field]: option });
    };

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef,
    onChange: setIsSidebarOpen,
  });

  return (
    <div ref={rootRef}>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onApply(formState);
            setIsSidebarOpen(false);
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
  );
};
