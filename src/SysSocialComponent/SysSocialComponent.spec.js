jest.mock('@claspo/renderer/sdk/WcElement', () => ({
  __esModule: true,
  default: class MockWcElement {
    constructor() {
      this.rootElement = globalThis.document.createElement('div');
    }

    getRootElement() {
      return this.rootElement;
    }
  },
}));

jest.mock('./SysSocial.manifest', () => ({
  __esModule: true,
  default: {
    name: 'SYS_SOCIAL',
  },
}));

import SysSocialComponent from './SysSocialComponent';

describe('SysSocialComponent', () => {
  let component;

  beforeEach(() => {
    component = new SysSocialComponent();
    component.urlManager = {
      getPlatformImageUrl: jest.fn(() => 'https://example.com/facebook.svg'),
    };
    component.getEnvironment = jest.fn(() => 'desktop');
  });

  it('adds accessible labels to social links and hides decorative images', () => {
    const platformNode = component.createPlatformComponent({
      type: 'FACEBOOK',
      order: 1,
      url: 'https://facebook.com/claspo',
    }, {
      size: {
        desktop: 32,
      },
    });

    const img = platformNode.querySelector('img');

    expect(platformNode.tagName).toBe('A');
    expect(platformNode.getAttribute('aria-label')).toBe('Facebook');
    expect(platformNode.getAttribute('rel')).toBe('noopener noreferrer');
    expect(img.alt).toBe('');
    expect(img.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes non-link icons with image semantics and accessible names', () => {
    const platformNode = component.createPlatformComponent({
      type: 'CUSTOM',
      order: 2,
    }, {
      size: {
        desktop: 24,
      },
    });

    expect(platformNode.tagName).toBe('DIV');
    expect(platformNode.getAttribute('role')).toBe('img');
    expect(platformNode.getAttribute('aria-label')).toBe('Custom social link');
  });

  it('renders the items container as a list', () => {
    const container = document.createElement('div');

    component.addItemsContent(container, {
      size: {
        desktop: 32,
      },
      options: [{
        type: 'INSTAGRAM',
        order: 1,
        url: 'https://instagram.com/claspo',
      }],
    });

    expect(container.getAttribute('role')).toBe('list');
    expect(container.querySelector('.social-list-item')).not.toBeNull();
  });
});
