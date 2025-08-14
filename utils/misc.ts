export function scrollToOffset(offsetY: number, duration = 150, scrollingElementSelector = '') {
  if (!document) {
    return;
  }

  const scrollingElement = !scrollingElementSelector
    ? document.documentElement
    : document.querySelector(scrollingElementSelector);

  if (!scrollingElement) {
    return;
  }

  const startingY = scrollingElement.scrollTop;
  const diff = offsetY - startingY;
  let start = 0;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;

    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start;

    // Get percent of completion in range [0, 1].
    const percent = Math.min(time / duration, 1);

    scrollingElement.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

export function browserName() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else if (userAgent.match(/brave/i)) {
    browserName = 'brave';
  } else {
    browserName = 'No browser detection';
  }
  return browserName;
}

export function browserSupportsMetaMask() {
  return ['chrome', 'firefox', 'brave', 'edge', 'opera'].includes(browserName());
}

export function metamaskNotSupportedMessage() {
  return browserSupportsMetaMask()
    ? 'You need <a href="https://web3-spaces.gitbook.io/web3-spaces-academy/other/metamask-setup" class="underline" target="_blank">MetaMask extension</a> to sign in!'
    : 'Your browser does not support <a href="https://web3-spaces.gitbook.io/web3-spaces-academy/other/metamask-setup" class="underline" target="_blank">MetaMask</a>, please use another browser!';
}
