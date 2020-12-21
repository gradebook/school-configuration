export type ValidationArray = [string, (property: any) => boolean] | [string, (property: any) => boolean, boolean];

// Records don't handle circular indexes well
/* eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style */
export type ValidationSchema = {
	[property: string]: ValidationArray | ValidationSchema;
};
