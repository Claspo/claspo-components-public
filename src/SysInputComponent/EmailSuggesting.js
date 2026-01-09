import getOverlayStyles from "./getOverlayStyles";
import waitForKeyboardHide from '@claspo/renderer/common/WaitForKeyboardHide';
import { createMenuOverlay, getMenuOverlayContentClassName } from '@claspo/renderer/sdk/OverlayUtils';
import emailProvidersList from './emailProvidersList';

export class EmailSuggesting {

  lastEmailSuggestionCheckedValue = null;
  emailSuggestionOverlayBackdrop = null;

  suggestEmail(
    props,
    inputElement,
    shouldSkipLastEmailSuggestionCheck,
    formService,
    control,
    getCurrentLanguageMap,
    htmlDocumentObject,
  ) {
    if (
      !inputElement.value ||
      (this.lastEmailSuggestionCheckedValue === inputElement.value && !shouldSkipLastEmailSuggestionCheck)
    ) {
      return;
    }

    if (props.control.validation && props.control.validation.restrictFreeDomains) {
      return;
    }

    this.lastEmailSuggestionCheckedValue = inputElement.value;

    if (!control.elementRef.classList.contains('invalid')) {
      if (emailProvidersList.includes(inputElement.value.toLowerCase().split('@')[1])) {
        return;
      }

      const suggestion = EmailSuggesting.suggestEmailSync(inputElement.value);
      const createSuggestionOverlay = (suggestion) => {
        this.createSuggestionOverlay(
          suggestion,
          inputElement,
          control,
          getCurrentLanguageMap,
          htmlDocumentObject,
        );
        EmailSuggesting.preventSubmit(formService);
      };

      if (suggestion) {
        createSuggestionOverlay(suggestion);
      }
    }
  }

  emailValueChanged() {
    this.lastEmailSuggestionCheckedValue = null;
  }

  hideEmailSuggestion() {
    if (this.emailSuggestionOverlayBackdrop) {
      this.emailSuggestionOverlayBackdrop.click();
    }
  }

  createSuggestionOverlay(
    suggestion,
    inputElement,
    control,
    getCurrentLanguageMap,
    htmlDocumentObject
  ) {
    this.hideEmailSuggestion();

    waitForKeyboardHide(() => {
      const overlay = createMenuOverlay({
        triggerElement: inputElement,
        overlayStyles: getOverlayStyles(getMenuOverlayContentClassName()),
        createOverlayContent: (backdrop, overlayContentContainer) => {
          EmailSuggesting.createOverlayContent(suggestion, backdrop, overlayContentContainer, control, getCurrentLanguageMap);
        },
        overlayWidth: 220,
        overlayHeight: 90,
        positionByDefault: 'top',
        isHorizontallyCentered: true,
        isBackdropDisabledOnUI: true,
        onDestroy: () => {
          this.emailSuggestionOverlayBackdrop = null
        },
        offset: 10,
        htmlDocumentObject: htmlDocumentObject,
      });

      this.emailSuggestionOverlayBackdrop = overlay.backdrop;
    });
  }

  static createOverlayContent(suggestion, backdrop, overlayContentContainer, control, getCurrentLanguageMap) {
    const componentLanguageMap = getCurrentLanguageMap();

    const textContainer = document.createElement('div');
    textContainer.classList.add('suggestion-text-container');
    const didYouMeanTextNode = document.createElement('div');
    didYouMeanTextNode.classList.add('did-you-mean-text');
    // Avoid injecting HTML from translations
    didYouMeanTextNode.textContent = componentLanguageMap['content,suggestionLabel'];
    const suggestionNode = document.createElement('div');
    suggestionNode.classList.add('suggestion-text');
    suggestionNode.textContent = `${suggestion}?`;
    const acceptButtonNode = document.createElement('div');
    acceptButtonNode.classList.add('accept-button');
    const denyButtonNode = document.createElement('div');
    denyButtonNode.classList.add('deny-button');

    textContainer.appendChild(didYouMeanTextNode);
    textContainer.appendChild(suggestionNode);

    acceptButtonNode.addEventListener('click', () => {
      const leftEmailPart = control.value.split('@')[0];
      control.setValue(`${leftEmailPart}@${suggestion}`);
      backdrop.click();
    });

    denyButtonNode.addEventListener('click', () => {
      backdrop.click();
    });

    overlayContentContainer.appendChild(textContainer);
    overlayContentContainer.appendChild(acceptButtonNode);
    overlayContentContainer.appendChild(denyButtonNode);
  }

  static preventSubmit(formService) {
    const submitBlockTime = 200; // To prevent submit if suggestion exist
    formService.setPreventSubmit(true);
    setTimeout(() => formService.setPreventSubmit(false), submitBlockTime);
  }

  static suggestEmailSync(inputValue) {
    const parsedInputValue = inputValue.toLowerCase();
    const domainPartOfInput = parsedInputValue.split('@')[1] || '';

    // If the domain is already in the list, no suggestion needed
    if (emailProvidersList.indexOf(domainPartOfInput) > -1) {
      return null;
    }

    // Check for dot placement issues
    const dotSuggestion = EmailSuggesting.getSuggestionAfterDotChecks(domainPartOfInput);
    if (dotSuggestion) {
      return dotSuggestion;
    }

    // If domain doesn't have a dot, it's likely incomplete
    if (!domainPartOfInput.includes('.')) {
      return null;
    }

    // Calculate Levenshtein distance for each provider domain
    const distances = emailProvidersList.map(provider => ({
      provider,
      distance: EmailSuggesting.getLevenshteinDistance(provider, domainPartOfInput)
    }));

    // Find the minimum distance
    const minDistance = Math.min(...distances.map(item => item.distance));

    // If the minimum distance is too large, don't suggest anything
    if (minDistance > 2) {
      return null;
    }

    // Get all providers with the minimum distance
    const closestProviders = distances
      .filter(item => item.distance === minDistance)
      .map(item => item.provider);

    // Check for character transposition (two characters in wrong order)
    const twoCharsWrongOrderSuggestion = EmailSuggesting.isTwoCharsWrongOrder(closestProviders, domainPartOfInput);

    // If distance is small enough, suggest the closest provider
    if (minDistance <= 1) {
      return closestProviders[0];
    }

    // If distance is 2 but there's a character transposition, suggest it
    if (minDistance === 2 && twoCharsWrongOrderSuggestion) {
      return twoCharsWrongOrderSuggestion;
    }

    return null;
  }

  static getSuggestionAfterDotChecks(inputValue) {
    return emailProvidersList.find(provider => EmailSuggesting.isDotLocatedInWrongPlace(provider, inputValue));
  }

  static isDotLocatedInWrongPlace(provider, inputValue) {
    if (!inputValue) {
      return;
    }

    return inputValue.replace('.', '') === provider.replace('.', '');
  }

  static getLevenshteinDistance(s, t) { // Levenshtein Distance algorithm
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] =
          i === 0
            ? j
            : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
      }
    }
    return arr[t.length][s.length];
  }

  static getAllMinimalDistanceDomains(minimalDistance, stringDistances, secondLevelDomainsList) {
    const minimalDistanceIndexes = stringDistances.reduce((acc, el, i) => {
      if (el === minimalDistance) {
        acc.push(i);
      }

      return acc;
    }, []);

    return secondLevelDomainsList.filter((_, i) => minimalDistanceIndexes.includes(i));
  }

  static isTwoCharsWrongOrder(suggestionCandidates, domain) {
    return suggestionCandidates.find(candidate => {
      const firstDifferentCharIndex = EmailSuggesting.findIndexOfFirstDiffInTwoStrings(domain, candidate);

      return domain.charAt(firstDifferentCharIndex) === candidate.charAt(firstDifferentCharIndex + 1) &&
        candidate.charAt(firstDifferentCharIndex) === domain.charAt(firstDifferentCharIndex + 1);
    });
  }

  static findIndexOfFirstDiffInTwoStrings(str1, str2) {
    return [...str1].findIndex((el, i) => el !== str2[i]);
  }
}
