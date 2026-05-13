import WcElement from "@claspo/renderer/sdk/WcElement";
import { SocialUrlManager } from "./SocialUrlManager";
import Manifest from "./SysSocial.manifest";
import componentStyle from "./componentStyle";
import componentTemplate from "./componentTemplate";
import { mapProps } from "./propsMapper";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysSocialComponent extends WcElement {
  static define = {
    name: 'sys-social',
    model: Manifest.name,
    manifest: Manifest,
  }
  manifest = Manifest;

  static componentStyle = componentStyle;
  static componentTemplate = componentTemplate;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
    <style>${SysSocialComponent.componentStyle}</style>
    ${SysSocialComponent.componentTemplate}
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.urlManager = new SocialUrlManager(this.assets());

    this.observeProps((prev, next) => {
      this.createContent(next);
      this.applyAutoAdaptiveStyles(next.adaptiveStyles);
    });

    this.observeEnvironment(() => {
      const props = this.getProps();
      this.createContent(props);
      this.applyAutoAdaptiveStyles(props.adaptiveStyles);
    });
  }

  createContent(props) {
    const root = this.getElement('social');
    const mappedProps = mapProps(props);
    const itemsContainer = root.querySelector('.items-wrapper');

    if (itemsContainer) {
      this._renderItemsForExistingComponent(itemsContainer, mappedProps);
    } else {
      this._renderItemsForEmptyComponent(root, mappedProps);
    }
  }

  _renderItemsForEmptyComponent(container, props) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('items-wrapper');

    this.addItemsContent(wrapper, props);

    insertHtmlIntoElement({
      element: container,
      html: '',
    });
    container.append(wrapper);
  }

  _renderItemsForExistingComponent(container, props) {
    const updatedNodes = {};

    props.options.forEach((platform) => {
      const key = this.getPlatformKey(platform);
      const existingItem = container.querySelector(`[key="${key}"]`);
      updatedNodes[key] = existingItem
        ? this._updatePlatformComponent(existingItem, platform, props)
        : this._createNewPlatformComponent(container, platform, props);

      this._setPlatformStyles(updatedNodes[key], platform);
    });

    for (const child of container.children) {
      const key = child.getAttribute('key');
      if (!updatedNodes[key]) {
        container.removeChild(child);
      }
    }
  }

  _updatePlatformComponent(container, platform, props) {
    const image = container.querySelector('img');
    const imageSrc = this.urlManager.getPlatformImageUrl(platform);
    if (image.src !== imageSrc) {
      image.src = imageSrc;
    }

    const size = props.size[this.getEnvironment()];

    if (size !== image.width) {
      image.height = size;
      image.width = size;
    }

    return container;
  }

  _createNewPlatformComponent(container, platform, props) {
    const newPlatformNode = this.createPlatformComponent(platform, props);
    container.append(newPlatformNode);
    return newPlatformNode;
  }

  addItemsContent(container, props) {
    container.classList.add('social-list');
    container.setAttribute('role', 'list');
    props.options.forEach(platform => {
      container.append(this.createPlatformComponent(platform, props));
    });
    return container;
  }

  createPlatformComponent(platform, props) {
    const { size } = props;
    const { url } = platform;

    let el;

    if (url) {
      el = document.createElement('a');
      el.setAttribute('href', url || '#');
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      el.setAttribute('aria-label', this.getPlatformAccessibleLabel(platform));
    } else {
      el = document.createElement('div');
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', this.getPlatformAccessibleLabel(platform));
    }

    el.classList.add('social-list-item');
    el.setAttribute('key', this.getPlatformKey(platform));
    this._setPlatformStyles(el, platform);

    const imageSrc = this.urlManager.getPlatformImageUrl(platform);

    const sizeByEnv = size[this.getEnvironment()];
    const img = document.createElement('img');
    img.src = imageSrc;
    img.height = sizeByEnv;
    img.width = sizeByEnv;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    insertHtmlIntoElement({
      element: el,
      html: '',
    });
    el.appendChild(img);
    return el;
  }

  getPlatformKey(platform) {
    return `${platform.type}-${platform.order}`;
  }

  _setPlatformStyles(container, platform) {
    container.setAttribute('style', `order:${platform.order}`);
  }

  getPlatformAccessibleLabel(platform) {
    const platformLabels = {
      FACEBOOK: 'Facebook',
      INSTAGRAM: 'Instagram',
      LINKEDIN: 'LinkedIn',
      TWITTER: 'Twitter',
      CUSTOM: 'Custom social link',
      EMAIL: 'Email',
      PINTEREST: 'Pinterest',
      WHATSAPP: 'WhatsApp',
    };

    return platformLabels[platform.type] || platformLabels.CUSTOM;
  }
}
