import ruleTester from '../utils/ruleTester';
import rule from './ng-no-component-class';

ruleTester.run('ng-no-component-class', rule, {
  valid: [
    {
      code: `
        const angular = require('angular');
        angular.module('foo', [])
          .component('componentName', componentObject);

        const componentObject = {
          controller: function() {},
          template: 'a template'
        }
      `,
    },
  ],

  invalid: [
    {
      errors: [{ message: 'Use .component("foo", {}) instead of .component("foo", new FooComponentClass())' }],
      code: `
        import angular from 'angular';
        angular.module('foo', [])
          .component('componentName', new ComponentClass());

        class ComponentClass {
          controller = function() {};
          template = 'a template';
        }
      `,
      output: `
        import angular from 'angular';
        angular.module('foo', [])
          .component('componentName', componentClass);

        const componentClass = {
  controller: function() {},
  template: 'a template'
};
      `,
    },
  ],
});
