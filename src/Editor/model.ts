import { createContext, useContext, useMemo } from 'react';

export type PropertyType =
  | {
      type: 'text';
    }
  | {
      type: 'number';
    }
  | {
      type: 'boolean';
    }
  | {
      type: 'choice';
      options: string[];
    }
  | {
      type: 'array';
    };

export type ItemType = {
  name: string;
  properties: Record<string, PropertyType>;
  leaf?: boolean; // can have child node or not
  validChildType?: string[];
};

export const ItemTypes: ItemType[] = [
  {
    name: 'number',
    properties: {
      multipleOf: { type: 'number' },
    },
    leaf: true,
  },
  {
    name: 'object',
    properties: {
      additionalProperties: { type: 'boolean' },
    },
    validChildType: ['properties', 'required'],
  },
  {
    name: 'properties',
    properties: {},
  },
  {
    name: 'boolean',
    properties: {},
    leaf: true,
  },
  {
    name: 'string',
    properties: {},
    leaf: true,
  },
  {
    name: 'required',
    properties: {
      items: {
        type: 'array',
      },
    },
    leaf: true,
  },
];

export type Tree = TreeNode[];

export type TreeNode = {
  label: string;
  id: string;
  parent?: string;
};

export type ContextType = {
  tree: Tree;
  append: (node: TreeNode) => void;
};

export const Context = createContext<ContextType>(
  null as unknown as ContextType,
);

export type TreeNodeView = TreeNode & {
  children: TreeNodeView[];
};

function toTree(source: Tree, item?: TreeNode) {
  if (!item) {
    item = source.find((item) => item.id === 'root');
  }

  let parent: TreeNodeView = { ...item, children: [] };
  parent.children = source
    .filter((x) => x.parent === item.id)
    .sort((a, b) => +a.id - +b.id)
    .map((y) => toTree(source, y));

  return parent;
}

export const useTreeView = () => {
  const { tree } = useContext(Context);

  return useMemo(() => {
    return toTree(tree);
  }, [tree]);
};

export const useAppend = () => {
  const { append } = useContext(Context);
  return append;
};
