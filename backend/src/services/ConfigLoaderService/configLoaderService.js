"use strict";
exports.__esModule = true;
function configLoader() {
    return {
        webhook: {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000
            },
            limiter: {
                max: 1,
                duration: 150
            }
        }
    };
}
exports["default"] = configLoader;
