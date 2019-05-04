import { envEnv } from '../env-env'
import { Options, Result } from '../types'


type EnvEnvTest = {
	name: string,
	env: { [key: string]: string },
	options?: Partial<Options>,
	expected: Result,
}

const tests: EnvEnvTest[] = [{
	name: 'value parse',
	env: {
		FOO: ' foo',
		BAR: '5.5 ',
		BAZ: 'true ',
		QUUX: ' false',
	},
	expected: {
		foo: ' foo',
		bar: 5.5,
		baz: true,
		quux: false,
	},
}, {
	name: 'nesting',
	env: {
		FOO__FOO_BAR__FOO_BAR_BAZ__: 'false',
		FOO__FOO_BAR__FOO_BAR_QUUX_: '55',
		FOO__FOO_BAR__FOO_BAR: 'http://one.com,http://two.com',
	},
	expected: {
		foo: {
			fooBar: {
				fooBarBaz: false,
				fooBarQuux: 55,
				fooBar: ['http://one.com', 'http://two.com'],
			},
		},
	},
}, {
	name: 'custom array separator',
	env: {
		FOO__FOO_BAR__FOO_BAR_BAZ__: 'false',
		FOO__FOO_BAR__FOO_BAR_QUUX_: '55',
		FOO__FOO_BAR__FOO_BAR: 'http://one.com;http://two.com',
	},
	options: { arraySeparator: ';' },
	expected: {
		foo: {
			fooBar: {
				fooBarBaz: false,
				fooBarQuux: 55,
				fooBar: ['http://one.com', 'http://two.com'],
			},
		},
	},
}, {
	name: 'one array item',
	env: {
		FOO__FOO_BAR__FOO_BAR: 'http://one.com,',
	},
	expected: {
		foo: {
			fooBar: {
				fooBar: ['http://one.com'],
			},
		},
	},
}]


describe('envEnv', () => {
	tests.forEach((testData) => {
		test(testData.name, () => {
			expect(envEnv(testData.env, testData.options)).toEqual(testData.expected)
		})
	})
})
