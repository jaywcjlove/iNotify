import path from 'path';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';

export default (conf, evn, options) => {
  conf = lessModules(conf, evn, options);
  conf = rawModules(conf, evn, options);
  conf = scopePluginOptions(conf, evn, {
    allowedFiles: [
      path.resolve(process.cwd(), 'README.md')
    ]
  });
  conf.ignoreWarnings = [
    { module: /node_modules[\\/]parse5[\\/]/ }
  ];
  if (evn === 'production') {
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        cacheGroups: {
          reactvendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
          },
          refractor: {
            test: /[\\/]node_modules[\\/](refractor)[\\/]/,
            name: 'refractor-vendor',
            chunks: 'all',
          },
          codemirror: {
            test: /[\\/]node_modules[\\/](@codemirror)[\\/]/,
            name: 'codemirror-vendor',
            chunks: 'all',
          },
        },
      },
    };
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
};