requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        js: '../js',
        pages: '../js/app/pages',
        jqueryFree: '../js/helpers/jquery-free',
        localStorage: '../js/helpers/local-storage'
    }
});

requirejs(['js/script']);