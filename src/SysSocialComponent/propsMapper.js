
import { LINK_TYPES, SOCIAL_MODES } from "./social.types";
import { getShareToPlatformUrlMapper } from "./shareManager";
import { isSocialPlatformValid } from "./socialConditions";

export function mapProps(props) {
  const resultProps = fixInvalidProps({ ...props?.control });

  if (resultProps.mode === SOCIAL_MODES.SHARE) {
    resultProps.options = prepareOptionsForSharingMode(resultProps);
  }

  return resultProps;
}

function fixInvalidProps(props) {
  const DEFAULT_OPTIONS = [];
  const DEFAULT_SIZE = 32;

  if (!Array.isArray(props.options)) {
    console.warn('SysSocial: options should be an array, setting default value');
    props.options = DEFAULT_OPTIONS;
  }

  const validOptions = props.options.filter(isSocialPlatformValid);

  if (validOptions.length !== props.options.length) {
    console.error('SysSocial: options contain invalid platforms, filtering them out');
    props.options = validOptions;
  }

  if (!Object.values(SOCIAL_MODES).includes(props.mode)) {
    console.error('SysSocial: mode is invalid, setting default value');
    props.mode = SOCIAL_MODES.FOLLOW;
  }

  if (typeof props.size !== 'object' && Number.isNaN(Number(props.size))) {
    console.error('SysSocial: size should be a number, setting default value');
    props.size = DEFAULT_SIZE;
  }

  if (typeof props.size === 'string' || typeof props.size === 'number') {
    console.warn('SysSocial: migrating size from primitive to object');
    props.size = {
      desktop: props.size,
      mobile: props.size,
    };
  }

  return props;
}

function prepareOptionsForSharingMode({ options, shareUrl, shareUrlType }) {
  const url = shareUrlType === LINK_TYPES.INTERNAL ? window.location.href : shareUrl;
  return options.reduce((acc, platform) => {
    const urlMapper = getShareToPlatformUrlMapper(platform);

    if (urlMapper) {
      acc.push({
        ...platform,
        url: urlMapper({ url, ...platform.props }),
      });
    }

    return acc;
  }, []);
}
