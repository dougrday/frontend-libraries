// tslint:disable
/**
 * Hello World API
 * A \"Hello World!\" API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * An error.
 * @export
 * @interface ErrorModel
 */
export interface ErrorModel {
    /**
     * A description of the error in English. This message is not intended to be displayed directly to users, but to help API consumers better understand the error.
     * @type {string}
     * @memberof ErrorModel
     */
    description?: string;
    /**
     * A unique code that identifies the error.
     * @type {string}
     * @memberof ErrorModel
     */
    errorCode: string;
    /**
     * A list of (usually unique) keys associated with the error.
     * @type {Array<string>}
     * @memberof ErrorModel
     */
    keys?: Array<string>;
}
