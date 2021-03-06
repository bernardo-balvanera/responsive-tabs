/// <reference path="_all.ts" />

namespace bbrt {
    /** The directive for the responsive tab. */
    export class ResponsiveTabDirective implements ng.IDirective {
        public restrict     = 'AE';
        public require      = '^responsiveTabs';
        public replace      = true;
        public transclude   = true;
        public scope = {
            heading    : '@',
            classes    : '@?',
            onSelect   : '&select',
            onDeselect : '&deselect'
        };
        public controllerAs = 'tab';

        constructor (private $parse: ng.IParseService) {

        }

        public controller(): void {
            return;
        }

        public templateUrl(element: JQuery, attrs: IResponsiveTabsDirectiveProperties): string {
            return attrs.templateUrl || 'bbrt/templates/tab.html';
        }

        public link(
            scope      : IResponsiveTab,
            element    : JQuery,
            attrs      : IResponsiveTabDirectiveAttributes,
            controller : IResponsiveTabsController,
            transclude : ng.ITranscludeFunction): void {
            scope.disabled = false;

            if (attrs.disable) {
                scope.$parent.$watch(this.$parse(attrs.disable), (value : string) => {
                    scope.disabled = Boolean(value);
                });
            }

            if (angular.isUndefined(attrs.classes)) {
                scope.classes = '';
            }

            if (!angular.isUndefined(attrs.active) && attrs.active == 'true') {
                scope.active = true;
            }

            scope.$on('$destroy', (event) => controller.removeTab(scope));
            scope.transclude = transclude;
            scope.onSelecting = (event: JQueryEventObject) => {
                if (!scope.disabled) {
                    controller.selectTab(scope.index, event);
                }
            };

            controller.addTab(scope);
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = ($parse: ng.IParseService) => new ResponsiveTabDirective($parse);
            returnValue.$inject = ['$parse'];

            return returnValue;
        }
    }
}
