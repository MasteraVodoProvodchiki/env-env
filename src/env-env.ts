import cast from '@masteravodoprovodchiki/casttovania'
import set from 'lodash.set'
import camelCase from 'camelcase'

import { Options, Env, Result } from './types'


const defaultOptions: Options = {
	nestSeparator: '__',
	arraySeparator: ',',
}

export const envEnv = (env: Env, inOptions: Partial<Options> = {}): Result => {
	const options = {
		...defaultOptions,
		...inOptions,
	}

	const items = Object.keys(env).reduce<{ [key: string]: string }>(
		(res, key) => {
			const path = key
				.split(options.nestSeparator)
				.map(part => camelCase(part.trim()))
				.filter(part => !!part)
				.join('.')

			if (path) {
				res[key] = path
			}

			return res
		},
		{},
	)

	const result = Object.keys(items).reduce<Result>(
		(res, key) => {
			const val = env[key]

			if (val !== undefined) {
				set(res, items[key], cast(val, { arraySeparator: options.arraySeparator }))
			}

			return res
		},
		{},
	)

	return result
}
