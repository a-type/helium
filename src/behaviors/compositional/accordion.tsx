import { useState, useCallback, ReactNode, HTMLAttributes } from 'react';
import { useButton } from '../controls/button';

export type AccordionConfig = {
  name: string;
  titleContent: ReactNode;
  titleLabel?: string;
};

export const useAccordion = ({
  name,
  titleContent,
  titleLabel,
}: AccordionConfig): [
  HTMLAttributes<HTMLElement>,
  HTMLAttributes<HTMLElement>,
  boolean
] => {
  const [expanded, setExpanded] = useState(false);

  const contentId = `${name}AccordionContent`;
  const buttonId = `${name}AccordionToggle`;

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const buttonProps = useButton(
    {
      onPress: toggleExpanded,
      id: buttonId,
      children: titleContent,
      label: titleLabel,
    },
    {
      id: buttonId,
      expanded,
      'aria-expanded': expanded,
      'aria-controls': contentId,
    },
  );

  const contentProps = {
    id: contentId,
    role: 'region',
    'aria-labelledby': buttonId,
    expanded,
  };

  return [buttonProps, contentProps, expanded];
};
