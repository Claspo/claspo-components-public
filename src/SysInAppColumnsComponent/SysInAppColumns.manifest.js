import SysColumnsManifest from '../SysColumnsComponent/SysColumns.manifest';

export default {
  ...SysColumnsManifest,
  props: {
    ...SysColumnsManifest.props,
    isResponsive: false,
  },
};
