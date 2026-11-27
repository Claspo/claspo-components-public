import DefaultEventEmitter from '@claspo/common/DefaultEventEmitter';
import FormGroup from '@claspo/renderer/form/FormGroup';
import ActivePathTracker from '@claspo/renderer/lead-capture/ActivePathTracker';
import SysRouterEvent from '@claspo/renderer/RouterEvent';
import SubmitStateService, { SubmitState } from '@claspo/renderer/submit-state/SubmitStateService';
import SysCheckboxListComponent from './SysCheckboxListComponent';

if (!customElements.get('sys-checkbox-list-test')) {
  customElements.define('sys-checkbox-list-test', SysCheckboxListComponent);
}

const OPTIONS = {
  art: { id: 'art', label: 'Art & museums', exportId: 'art', sort: 0 },
  family: { id: 'family', label: 'Family leisure', exportId: 'family', sort: 1 },
  outdoor: { id: 'outdoor', label: 'Outdoor activities', exportId: 'outdoor', sort: 2 },
};

/** The options, with these ones checked by default, as the editor writes them. */
function withChecked(...ids) {
  return Object.fromEntries(Object.entries(OPTIONS).map(([id, option]) => [
    id,
    ids.includes(id) ? { ...option, checkedByDefault: true } : option,
  ]));
}

/**
 * The list as a view renders it: on the real form of the widget, through the renderer's own control registration, so
 * what decides between the options checked by default and what the visitor did is the form, not a stub.
 */
function mount({ options, form, renderMode = 'STATIC', viewIndex = 1, name = 'interests' }) {
  const component = new SysCheckboxListComponent();
  component.model = {
    id: 'interests-component',
    path: [viewIndex, 0],
    props: {
      control: {
        name,
        options,
        defaultValue: null,
        optionsAlphabeticSort: { enabled: false },
        validation: { required: true },
      },
      adaptiveStyles: { desktop: [], mobile: [] },
    },
  };
  component.services = {
    form,
    config: { getConfig: (key) => (key === 'renderMode' ? renderMode : undefined) },
    context: { getRegistry: () => ({}) },
  };
  component.markerStyleAttributes = { ...SysCheckboxListComponent.defaultMarkerStyleAttributes };
  component.registerControl(component.getRootElement());
  component.createContent();
  return component;
}

function createForm() {
  return new FormGroup({ send: () => {} });
}

const checkedIds = (component) => Array.from(component.getRootElement().querySelectorAll('input[type="checkbox"]'))
  .filter((input) => input.checked)
  .map((input) => input.id.replace('cl-checkbox-', ''));

/** A visitor's click on an option, as the live widget takes it. */
function click(component, id) {
  component.getRootElement().querySelector(`#cl-checkbox-${id}`).closest('.checkboxListItem').click();
}

/** Lets the form's debounced validation run, which is when a control reports a change of its value. */
async function settle() {
  await jest.advanceTimersByTimeAsync(1000);
}

/**
 * A widget whose list, under this control name, is on its second view, and the submit state that closing it reads.
 * Each test names its own list: the values lists start from are kept by name for the whole page.
 */
function multiStepWidget(name) {
  const emitter = new DefaultEventEmitter();
  const form = createForm();
  const tracker = new ActivePathTracker(emitter, form, { getRecordsMap: () => ({}) }, { getState: () => ({}), setState: () => {} });
  const submitState = new SubmitStateService(form, emitter);
  emitter.emit(SysRouterEvent.NAVIGATION_END, 0);

  return {
    form,
    submitState,
    // a view's controls register while it renders, before its navigation ends
    showList: (options) => {
      const component = mount({ options, form, viewIndex: 1, name });
      emitter.emit(SysRouterEvent.NAVIGATION_END, 1);
      return component;
    },
    back: () => emitter.emit(SysRouterEvent.NAVIGATION_END, 0),
    destroy: () => {
      tracker.destroy();
      submitState.destroy();
    },
  };
}

describe('SysCheckboxListComponent: options checked by default', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts a new field with the options checked by default, which satisfy a required field', async () => {
    const form = createForm();
    const component = mount({ options: withChecked('art', 'outdoor'), form });

    expect(form.getControl('interests').getValue()).toEqual({ art: 'art', outdoor: 'outdoor' });
    expect(checkedIds(component)).toEqual(['art', 'outdoor']);
    await expect(form.getControl('interests').validate({ silent: true })).resolves.toBe(true);
  });

  it('leaves a list without such options as it was: nothing checked, and a required field asks for a choice', async () => {
    const form = createForm();
    const component = mount({ options: OPTIONS, form });

    expect(form.getControl('interests').getValue()).toBeUndefined();
    expect(checkedIds(component)).toEqual([]);
    await expect(form.getControl('interests').validate({ silent: true })).resolves.toBe(false);
  });

  it('lets the visitor uncheck an option checked by default, and sends what is checked', () => {
    const form = createForm();
    const component = mount({ options: withChecked('art', 'family'), form });

    click(component, 'art');
    click(component, 'outdoor');

    expect(form.getControl('interests').getValue()).toEqual({ family: 'family', outdoor: 'outdoor' });
  });

  it('keeps what the visitor unchecked when the view mounts again, all of it too', () => {
    const form = createForm();
    const first = mount({ options: withChecked('art', 'family'), form });
    click(first, 'art');

    // the router renders the view anew on every navigation, on the same form
    const again = mount({ options: withChecked('art', 'family'), form });
    expect(form.getControl('interests').getValue()).toEqual({ family: 'family' });
    expect(checkedIds(again)).toEqual(['family']);

    click(again, 'family');
    const emptied = mount({ options: withChecked('art', 'family'), form });
    expect(form.getControl('interests').getValue()).toBeFalsy();
    expect(checkedIds(emptied)).toEqual([]);
  });

  it('gives a view walked again what the visitor left on it, not the options checked by default', () => {
    const emitter = new DefaultEventEmitter();
    const form = createForm();
    const tracker = new ActivePathTracker(emitter, form, { getRecordsMap: () => ({}) }, { getState: () => ({}), setState: () => {} });
    emitter.emit(SysRouterEvent.NAVIGATION_END, 0);
    // a view's controls register while it renders, before its navigation ends
    const first = mount({ options: withChecked('art'), form, viewIndex: 1 });
    emitter.emit(SysRouterEvent.NAVIGATION_END, 1);
    click(first, 'art');
    click(first, 'family');

    // back: the view's values are stashed and its control leaves the form
    emitter.emit(SysRouterEvent.NAVIGATION_END, 0);
    expect(form.hasControl('interests')).toBe(false);
    // forward on the same path: a new control, which gets the stashed values over the defaults
    const again = mount({ options: withChecked('art'), form, viewIndex: 1 });
    emitter.emit(SysRouterEvent.NAVIGATION_END, 1);

    expect(form.getControl('interests').getValue()).toEqual({ family: 'family' });
    expect(checkedIds(again)).toEqual(['family']);
    tracker.destroy();
  });

  it('does not take a view walked again for the visitor\'s change when the list was left as it opened', async () => {
    const widget = multiStepWidget('rewalked');
    widget.showList(withChecked('art', 'family'));
    await settle();

    widget.back();
    const again = widget.showList(withChecked('art', 'family'));
    await settle();

    expect(widget.form.getControl('rewalked').getValue()).toEqual({ art: 'art', family: 'family' });
    expect(checkedIds(again)).toEqual(['art', 'family']);
    // closing commits only a changed form: the options checked by default alone must not become a lead
    expect(widget.submitState.getState()).toBe(SubmitState.IDLE);
    widget.destroy();
  });

  it('takes unchecking an option checked by default for the visitor\'s change', async () => {
    const form = createForm();
    const submitState = new SubmitStateService(form, new DefaultEventEmitter());
    const component = mount({ options: withChecked('art', 'family'), form, name: 'unchecked' });
    await settle();
    expect(submitState.getState()).toBe(SubmitState.IDLE);

    click(component, 'art');
    await settle();

    expect(form.getControl('unchecked').getValue()).toEqual({ family: 'family' });
    expect(submitState.getState()).toBe(SubmitState.DIRTY);
    submitState.destroy();
  });

  it('takes the last uncheck for a change on a list without options checked by default too', async () => {
    const form = createForm();
    const submitState = new SubmitStateService(form, new DefaultEventEmitter());
    const component = mount({ options: OPTIONS, form, name: 'no-defaults' });

    // within one validation debounce, so the uncheck gives the value the form validates
    click(component, 'art');
    click(component, 'family');
    click(component, 'family');
    await settle();

    expect(form.getControl('no-defaults').getValue()).toEqual({ art: 'art' });
    expect(submitState.getState()).toBe(SubmitState.DIRTY);
    submitState.destroy();
  });

  it('never changes the value a list started from, so the widget opened again starts from the same options', () => {
    const form = createForm();
    const component = mount({ options: withChecked('art', 'family'), form, name: 'started-from' });
    const startedFrom = form.getControl('started-from').getValue();

    click(component, 'art');
    click(component, 'family');

    expect(startedFrom).toEqual({ art: 'art', family: 'family' });
    const reopened = mount({ options: withChecked('art', 'family'), form: createForm(), name: 'started-from' });
    expect(checkedIds(reopened)).toEqual(['art', 'family']);
  });

  it('does not start a list from a value that something else has changed in place', () => {
    const form = createForm();
    mount({ options: withChecked('art', 'family'), form, name: 'changed-in-place' });
    // not the list's doing: its click handler copies the value before an uncheck
    delete form.getControl('changed-in-place').getValue().art;

    const reopenedForm = createForm();
    const reopened = mount({ options: withChecked('art', 'family'), form: reopenedForm, name: 'changed-in-place' });

    expect(reopenedForm.getControl('changed-in-place').getValue()).toEqual({ art: 'art', family: 'family' });
    expect(checkedIds(reopened)).toEqual(['art', 'family']);
  });

  it('keeps apart lists with the same name and other options checked by default, as on two copies of a widget', async () => {
    const widget = multiStepWidget('copied');
    widget.showList(withChecked('art'));
    await settle();
    // a copy of the widget on the same page: copying a widget keeps its control names
    const copyForm = createForm();
    const copy = mount({ options: withChecked('outdoor'), form: copyForm, name: 'copied' });

    widget.back();
    widget.showList(withChecked('art'));
    await settle();

    expect(widget.form.getControl('copied').getValue()).toEqual({ art: 'art' });
    expect(widget.submitState.getState()).toBe(SubmitState.IDLE);
    expect(copyForm.getControl('copied').getValue()).toEqual({ outdoor: 'outdoor' });
    expect(checkedIds(copy)).toEqual(['outdoor']);
    widget.destroy();
  });

  it('tells apart options checked by default that have no Value, on copies of a widget and on the canvas', () => {
    const withoutValues = (checkedId) => Object.fromEntries(Object.entries(OPTIONS).map(([id, { exportId, ...option }]) => [
      id,
      id === checkedId ? { ...option, checkedByDefault: true } : option,
    ]));

    const first = mount({ options: withoutValues('art'), form: createForm(), name: 'no-values' });
    const copy = mount({ options: withoutValues('family'), form: createForm(), name: 'no-values' });
    expect(checkedIds(first)).toEqual(['art']);
    expect(checkedIds(copy)).toEqual(['family']);

    const canvas = mount({ options: withoutValues('art'), form: createForm(), renderMode: 'UPDATING', name: 'no-values' });
    canvas.model.props = {
      ...canvas.model.props,
      control: { ...canvas.model.props.control, options: withoutValues('family') },
    };
    canvas.createContent();
    expect(checkedIds(canvas)).toEqual(['family']);
  });

  it('shows on the editor\'s canvas what the merchant sets, as the switch changes', () => {
    const form = createForm();
    const component = mount({ options: withChecked('family'), form, renderMode: 'UPDATING' });
    expect(checkedIds(component)).toEqual(['family']);

    component.model.props = {
      ...component.model.props,
      control: { ...component.model.props.control, options: withChecked('art', 'family') },
    };
    component.createContent();

    expect(checkedIds(component)).toEqual(['art', 'family']);
  });
});
