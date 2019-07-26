export const ENV_IS_DEV = process.env.NODE_ENV === "development";

export const PREFIX_NAME = '@wya/utils/';
export const formatKey = (key, version) => {
	return `${version ? `${PREFIX_NAME}${version}:` : ''}${key}`;
};