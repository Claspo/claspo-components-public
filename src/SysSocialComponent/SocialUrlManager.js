import { SOCIAL_ICON_SHAPES, SOCIAL_TYPES } from './social.types';

export class SocialUrlManager {
  constructor(staticResourcesUrl) {
    this.imgPath = `${staticResourcesUrl.replace(/\/$/, "")}/img`;
  }

  getValidPlatformName(platform) {
    return SOCIAL_TYPES[platform.type] ? platform.type : SOCIAL_TYPES.CUSTOM;
  }

  getValidIconMode(platform) {
    return (SOCIAL_ICON_SHAPES[platform.mode] ? platform.mode : SOCIAL_ICON_SHAPES.ROUNDED)
      .toLowerCase();
  }

  getDefaultImage() {
    return `${this.imgPath}/image-placeholder.svg`;
  }

  getPlatformImageUrl(platform) {
    // Image should exist for custom platforms in most of cases
    if (platform.image) {
      return platform.image;
    }

    const platformName = this.getValidPlatformName(platform);

    if (platformName === SOCIAL_TYPES.CUSTOM) {
      return this.getDefaultImage();
    }

    // Here we can be sure that platformName is valid and non-custom, so images is already exist
    const platformImageId = `${platformName.toLowerCase()}-logo`;
    const mode = this.getValidIconMode(platform);
    const platformModeSuffix = mode ? `-${mode}` : '';
    const platformUrl = `${this.imgPath}/${platformImageId}${platformModeSuffix}.svg`;

    return platformUrl;
  }
}
