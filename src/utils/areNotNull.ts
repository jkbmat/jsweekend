export function areNotNull (...args: Array<any>) {
	return args.every((arg) => arg !== null)
}