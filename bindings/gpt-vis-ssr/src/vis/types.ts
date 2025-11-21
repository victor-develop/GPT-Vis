import type { Options as G2SSROptions } from '@antv/g2-ssr';

export type CommonOptions = {
  width?: number;
  height?: number;
  theme?: string;
  texture?: 'rough' | 'default';
  renderPlugins?: G2SSROptions['renderPlugins'];
};
