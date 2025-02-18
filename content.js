// Copyright (c) 2024 Rossolve IT. All rights reserved.

// Observes page title for changes, if regex exists removes matching chars.
new MutationObserver(function() {
    if (/^\((.*?)\)\s/.test(document.title)) {
        document.title = document.title.replace(/^\((.*?)\)\s/, "");
    }
})
.observe(document.querySelector('title'), {childList: true});
