const GET_ELEMENT_INTERVAL = 100;
const GET_ELEMENT_TIMEOUT = 15 * 1000;

const waitFor = (selector) => {
  return new Promise((resolve) => {
    const getElement = (fn) => {
      const $elem = document.querySelector(selector);
      if ($elem) {
        if (fn) fn();
        resolve($elem);
      }
    };
    getElement();

    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += GET_ELEMENT_INTERVAL;
      if (elapsed >= GET_ELEMENT_TIMEOUT) {
        console.error(`Timeout out while waiting for selector ${selector}`);
        clearInterval(id);
        return;
      }
      getElement(() => {
        clearInterval(id);
      });
    }, GET_ELEMENT_INTERVAL);
  });
};

(async () => {
  // wait until title element is rendered
  const titleElement = await waitFor("title");
  if (titleElement) {
    // Observes page title for changes, if regex exists removes matching chars.
    new MutationObserver(function () {
      if (/^\((.*?)\)\s/.test(document.title)) {
        document.title = document.title.replace(/^\((.*?)\)\s/, "");
      }
    }).observe(titleElement, { childList: true, subtree: true });
  } else {
    console.error("Title element not found.");
  }
})();
