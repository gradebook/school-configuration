export type ValidationArray = [string, (property: any) => boolean] | [string, (property: any) => boolean, boolean];

export type ValidationSchema = {
	[property: string]: ValidationArray | ValidationSchema;
};
