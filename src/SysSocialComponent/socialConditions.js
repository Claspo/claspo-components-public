export function isSocialPlatformValid(platform) {
  const res = platform && platform.type;
  return Boolean(res);
}