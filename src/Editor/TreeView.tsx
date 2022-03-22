import { useCallback, useState } from 'react';
import 'react-complex-tree/lib/style.css';
import styled from 'styled-components';
import { TreeNodeView, useAppend, useTreeView } from './model';
import { nanoid } from 'nanoid';
const TreeView: React.FC = () => {
  const tree = useTreeView();
  const append = useAppend();

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      console.log('Drop', e);
      const itemType = e.dataTransfer.getData('itemType');
      append({
        id: nanoid(),
        label: 'new node ' + itemType,
        parent: (e.target as HTMLElement).dataset.nodeId || 'root',
      });
      setDragOver(false);
    },
    [append],
  );

  const [dragOver, setDragOver] = useState(false);
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
    return true;
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <StyledTreeViewContainer
      dragOver={dragOver}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e)}
    >
      {tree.children?.map((t) => (
        <NodeView key={t.id} {...t} />
      ))}
    </StyledTreeViewContainer>
  );
};

export default TreeView;

const StyledTreeViewContainer = styled.div<{ dragOver: boolean }>`
  height: 100%;
  background-color: ${(p) => (p.dragOver ? '#ddd5' : undefined)};
`;

const NodeView: React.FC<TreeNodeView> = ({ label, id, children }) => {
  return (
    <StyledNodeView>
      <NodeLabel data-node-id={id}>{label}</NodeLabel>

      <ChildrenView>
        {children?.map((t) => (
          <NodeView key={t.id} {...t} />
        ))}
      </ChildrenView>
    </StyledNodeView>
  );
};

const ChildrenView = styled.div`
  padding-left: 15px;
  position: relative;

  &::before {
    content: '';
    height: 100%;
    left: 15px;
    top: 0px;
    width: 1px;
    background-color: #f0f0f0;
    position: absolute;
  }
`;

const StyledNodeView = styled.div`
  padding-top: 10px;
  padding-left: 15px;
`;

const NodeLabel = styled.div`
  border: 1px solid #d8d8d8;
  padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    height: 1px;
    top: calc(50% - 1px);
    width: 15px;
    right: 100%;
    background-color: #f0f0f0;
    position: absolute;
  }
`;
