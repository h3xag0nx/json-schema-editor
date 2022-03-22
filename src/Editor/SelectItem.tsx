import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ItemTypes } from './model';

const SelectItem: React.FC = () => {
  const onDragStart = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    const itemType = ev.currentTarget.dataset.itemType as string;
    ev.dataTransfer.setData('itemType', itemType);
  }, []);

  return (
    <StyledSelectItem>
      {ItemTypes.map((t) => (
        <Item
          draggable
          onDragStart={onDragStart}
          data-item-type={t.name}
          key={t.name}
        >
          {t.name}
        </Item>
      ))}
    </StyledSelectItem>
  );
};

export default SelectItem;

const StyledSelectItem = styled.div`
  border-right: 1px solid #d8d8d8;
`;

const Item = styled.div`
  padding: 5px;
  cursor: move;
  &:hover {
    background-color: #d8d8d8;
  }
`;
