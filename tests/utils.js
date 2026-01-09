import FormGroup from "@claspo/renderer/form/FormGroup";
import SourceRegistry from "@claspo/renderer/sdk/source/SourceRegistry";
import ContextData from "@claspo/renderer/sdk/context/ContextData";
import ContextSDK from "@claspo/renderer/sdk/context/ContextSDK";

export const createMockEmitter = () => {
    return {
        emit: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
    }
};
const configServer = {
    getConfig: () => jest.fn()
};
const form = new FormGroup({
    send: () => {
    },
    trackClick: () => {
    },
    on: () => {
    },
    getControlsAsArray: () => []
});
const sourceRegistry = new SourceRegistry(form);
const contextData = new ContextData();
const context = new ContextSDK(sourceRegistry, contextData, true);
const model = {
    id: 123,
    path: [0, 0],
    props: {
        adaptiveStyles: {
            desktop: ['host', 'input', "image", 'label'].map(element => ({ element, styleAttributes: {}, params: {} })),
            mobile: []

        },
        content: {
            text: 'TRY AGAIN!',
        },
        control: {
            imageSource: {},
            validation: {}
        },
    }
};
const mergeTagsProcessorFactory = {
    create: () => {
        return {
            destroy: () => jest.fn()
        }
    }
};


export const createMockProps = (propsOverride) => ({
    resizeListener: {
        isMobile: () => false,
        ...createMockEmitter()
    },

    viewResourceManager: {
        viewHasPendingResources: () => false,
        registerComponent: () => jest.fn()
    },
    documentModel: {
        getShared: () => ({}),
        getView: () => ({}),
        ...createMockEmitter()
    },

    model: {
        ...model,
        props: {
            ...model.props,
            ...propsOverride,
        }
    },
    services: {
        eventEmitter: createMockEmitter(),
        config: configServer,
        form,
        context,
        mergeTagsProcessorFactory,
    },
});
