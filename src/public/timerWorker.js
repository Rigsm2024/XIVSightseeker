// Countdown timer who keeps counting even if the browser is in background mode.
self.onmessage = function (event) {
    const delay = event.data;
    setTimeout(() => {
        self.postMessage('update');
    }, delay);
};