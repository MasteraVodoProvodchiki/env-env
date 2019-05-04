export type Primitive = string | number | boolean | null

export interface Env {
	[key: string]: string | undefined
}

export interface Result {
	[key: string]: Primitive | Primitive[] | Result
}

export interface Options {
	nestSeparator: string,
	arraySeparator: string,
}
