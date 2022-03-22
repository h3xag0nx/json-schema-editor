import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Context, Tree, TreeNode } from './model';
import SelectItem from './SelectItem';
import TreeView from './TreeView';

const Editor: React.FC = () => {
  const [tree, setTree] = useState<Tree>([
    {
      label: '',
      id: 'root',
    },
  ]);

  const append = useCallback((node: TreeNode) => {
    console.debug('append', node);
    setTree((x) => [...x, node]);
  }, []);

  const contextValue = useMemo(() => {
    return { tree, append };
  }, [append, tree]);

  return (
    <Context.Provider value={contextValue}>
      <Container>
        <SelectItem />
        <TreeView />
      </Container>
    </Context.Provider>
  );
};

export default Editor;

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 2fr 2fr 2fr;
  grid-gap: 10px;
  height: 100%;
`;
