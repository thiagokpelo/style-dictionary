/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const StyleDictionary = require('../../index');

const StyleDictionaryExtended = StyleDictionary.extend({});

describe('register', () => {
  describe('format', () => {
    it('should error if name is not a string', () => {
      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          formatter() {},
        })
      ).toThrow('transform name must be a string');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 1,
          formatter() {},
        })
      ).toThrow('transform name must be a string');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: [],
          formatter() {},
        })
      );

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: {},
          formatter() {},
        })
      ).toThrow('transform name must be a string');
    });

    it('should error if formatter is not a function', () => {
      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 'test',
        })
      ).toThrow('format formatter must be a function');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 'test',
          formatter: 1,
        })
      ).toThrow('format formatter must be a function');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 'test',
          formatter: 'name',
        })
      ).toThrow('format formatter must be a function');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 'test',
          formatter: [],
        })
      ).toThrow('format formatter must be a function');

      expect(
        StyleDictionaryExtended.registerFormat.bind(null, {
          name: 'test',
          formatter: {},
        })
      ).toThrow('format formatter must be a function');
    });

    it('should work if name and formatter are good', () => {
      StyleDictionaryExtended.registerFormat({
        name: 'scss',
        formatter() {},
      });
      expect(typeof StyleDictionaryExtended.format.scss).toBe('function');
    });

    it('should properly pass the registered format to instances', () => {
      const SDE2 = StyleDictionaryExtended.extend({});
      expect(typeof SDE2.format.scss).toBe('function');
    });
  });
});