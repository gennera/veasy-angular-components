angular.module('veasy.momentFormat').directive('vMomentFormat', ['$timeout', 'vMomentFormatService', function ($timeout, vMomentFormatService) {
    return {
        require: 'ngModel',
        link: function ($scope, $elm, $attrs, $ctrl) {
            const OPTIONS = vMomentFormatService.getOptions($attrs.vMomentFormat);
            let isBackspace = false;

            const init = function () {
                bindElement();
                inputController();
                setFieldPlaceholder(OPTIONS);
            };

            const bindElement = function () {
                $elm.bind('blur', function (e) {
                    if (!vMomentFormatService.isValid(e.target.value, OPTIONS.regex, OPTIONS.format)) {
                        resetField();
                    }
                });
                $elm.bind('keydown', function (e) {
                    const keyCode = e.which || e.keyCode;
                    isBackspace = keyCode === 8;
                    if (!vMomentFormatService.isValidKeyCode(keyCode, e.shiftKey)) e.preventDefault();
                });
            };

            const inputController = function () {
                $ctrl.$parsers.push(function (viewValue) {
                    if (!isBackspace) {
                        viewValue = vMomentFormatService.defineInputSize(viewValue, OPTIONS);
                        viewValue = vMomentFormatService.applySeparators(viewValue, OPTIONS);
                    }
                    $elm[0].value = viewValue;
                    viewValue = moment(viewValue, OPTIONS.format);
                    notifyChanges(viewValue);
                    isBackspace = false;
                    return viewValue;
                });
                $ctrl.$formatters.push(function (modelValue) {
                    if (!modelValue || modelValue.toString() === 'Invalid Date') return '';
                    modelValue = modelValue ? moment(modelValue).format(OPTIONS.format) : modelValue;
                    notifyChanges(modelValue);
                    return modelValue;
                });
            };

            const resetField = function () {
                $ctrl.$setViewValue('');
                $ctrl.$setPristine();
            };

            const setFieldPlaceholder = function (options) {
                $elm[0].placeholder = vMomentFormatService.getFieldPlaceholder(options.format);
            };

            const notifyChanges = function (msg, value) {
                $scope.$emit('veasyMomentFormat:onChange', value);
            };

            init();
        }
    }
}]);
