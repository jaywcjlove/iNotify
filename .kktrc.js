import path from 'path';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';

export default (conf, evn, options) => {
  conf = lessModules(conf, evn, options);
  conf = rawModules(conf, evn, options);
  return scopePluginOptions(conf, evn, {
    allowedFiles: [
      path.resolve(process.cwd(), 'README.md')
    ]
  });
};