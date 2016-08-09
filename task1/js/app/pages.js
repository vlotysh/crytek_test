define(["jqueryFree", "localStorage"], function ($$, LocalStorage) {
    return  {
        settings: {
            init: function () {

                var settings = JSON.parse(LocalStorage.getValue('settings-form'));
                $$.select('.controll-button').hide();

                    $$.select('.castom-checkbox').each(function (i, el) {
                        if (settings && settings.hasOwnProperty(el.value)) {
                            el.checked = settings[el.value];
                            el.setAttribute('data-default', el.checked);
                        }else {
                            el.setAttribute('data-default', false);
                        }
                    });

                this.events();
            },
            events: function () {

                $$.select('.castom-checkbox').on('change', function (event) {
                    var isChanged = false;

                    $$.select('.controll-button').hide();

                    $$.select('.castom-checkbox').each(function (i, el) {
                        var defaultValue = el.getAttribute('data-default');

                        if (defaultValue !== el.checked.toString()) {
                            isChanged = true;
                        }
                    }
                    )

                    if (isChanged) {
                        $$.select('#submit').show();
                        $$.select('#cancel').show();
                    }


                });

                $$.select('#submit').on('click', function (event) {
                    var valuesList = {};
                    $$.select('.castom-checkbox').each(function (i, el) {
                        valuesList[el.value] = el.checked;
                        el.setAttribute('data-default', el.checked);
                    })

                    var jsonString = JSON.stringify(valuesList);
                    LocalStorage.setValue('settings-form', jsonString);
                    $$.trigger('change', '.castom-checkbox');
                    $$.select('#default').show();

                });


                $$.select('#cancel').on('click', function (event) {
                    var defaultAttr;
                    $$.select('.castom-checkbox').each(function (i, el) {
                        defaultAttr = ("true" == el.getAttribute('data-default'));

                        el.checked = defaultAttr;
                    })

                    $$.trigger('change', '.castom-checkbox');

                });

            }
        }
    }
})