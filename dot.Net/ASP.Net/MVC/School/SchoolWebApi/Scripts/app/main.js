///<reference path="../typings/requirejs/require.d.ts"/>
'use strict';
require.config({
    // Load paths from global variable
    paths: {
        'jQuery': '../jquery.min',
        'angular': '../angular',
        'angular-route': '../angular-route',
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular-route': ['angular'],
        'angular-loading-bar': ['angular'],
        'angular-animate': ['angular'],
        'angular-ui-router': ['angular'],
        'angular': { 'exports': 'angular', deps: ['jQuery'] },
        'jQuery': { 'exports': 'jQuery' },
        "domReady": ["angular"],
        "angular-resource": ["angular"],
        "textAngular": ["angular"],
        "angular-cookies": ["angular"],
        "ui-bootstrap-tpls": ["angular"],
        "angular-disqus": ["angular"],
        "angular-notify": ["angular"],
        "angular-gravatar": ["angular"],
        "angular-sanitize": ["angular"],
        "twitter-bootstrap": ["angular"],
        "ui-utils": ["angular"],
        "md5": ["angular"]
    },
    // Kick start application
    deps: [
        './environment',
        './Aisel/Kernel/AiselKernel',
        './Aisel/Homepage/AiselHomepage',
        './Aisel/Contact/AiselContact',
        './Aisel/Search/AiselSearch',
        './Aisel/Page/AiselPage',
        './Aisel/Product/AiselProduct',
        './Aisel/User/AiselUser',
        './Aisel/Cart/AiselCart',
        './Aisel/Order/AiselOrder',
        './Aisel/Exception/AiselException',
        'bootstrap',
    ],
    priority: [
        "angular"
    ]
});
//# sourceMappingURL=main.js.map