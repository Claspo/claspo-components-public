import { SOCIAL_TYPES } from "./social.types";

function getShareMappers() {
  return {
    [SOCIAL_TYPES.FACEBOOK]: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    [SOCIAL_TYPES.LINKEDIN]: ({ url }) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    [SOCIAL_TYPES.TWITTER]: ({ url }) => `https://twitter.com/intent/tweet?url=${url}`,
    [SOCIAL_TYPES.PINTEREST]: ({ url }) => `https://www.pinterest.com/pin/create/button/?url=${url}`,
    [SOCIAL_TYPES.WHATSAPP]: ({ url }) => `https://wa.me/?text=${url}`,
    [SOCIAL_TYPES.EMAIL]: ({ url, subject = '' }) => `mailto:?body=${url}&subject=${subject}`,
  }
}

export function getShareToPlatformUrlMapper(platform) {
  if (!platform) {
    return null;
  }

  const shareMappers = getShareMappers();
  return shareMappers[platform.type];
}