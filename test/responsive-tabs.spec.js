'use strict';

describe('responsive-tabs', function () {
  var scope, $compile, $rootScope, element;

  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);
    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(module('ngSanitize', 'bb.responsive-tabs'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    if (element) element.remove();
  });

  describe('as an element', function(){ runTestsWithTemplate('<responsive-tabs></responsive-tabs>'); });
  describe('as an attribute', function(){ runTestsWithTemplate('<div responsive-tabs></div>'); });

  function runTestsWithTemplate(template) {
    describe('when created', function () {

      it('should initial the value to 0', function () {
        element = createDirective(template);

        expect(element.text()).toContain('0');
      });
    });
  }

});