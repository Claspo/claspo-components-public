import SysColumnsComponent from "../SysColumnsComponent/SysColumnsComponent";
import SysInAppColumnsManifest from "./SysInAppColumns.manifest";

export default class SysInAppColumnsComponent extends SysColumnsComponent {
  static define = {
    name: 'sys-columns',
    model: SysInAppColumnsManifest.name,
    manifest: SysInAppColumnsManifest
  };

}

