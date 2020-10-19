import { Injectable } from '@angular/core';

import { JSEncrypt } from 'jsencrypt';


@Injectable({ providedIn: 'root' })
export class UtilService {

    constructor() { }

    /**
     * @description Receive itemName in param, after call localStorage to get this object and return ir as object.
     * @param itemName Name of the item that this method will get from localStorage.
     * @returns Returns an item according to the itemName param that was received.
     */
    public getLocalStorageItem(itemName: string): any {
        const item = localStorage.getItem(itemName);
        return JSON.parse(item);
    }

    /**
     * @description Receive a name and a value and set this item with the respective name into localStorage.
     * @param itemName Name of the item that will be save in localStorage.
     * @param itemValue Value of the object that will be inserted into localStorage.
     * @returns Void.
     */
    public setLocalStorageItem(itemName: string, itemValue: any): void {
        itemValue = JSON.stringify(itemValue);
        localStorage.setItem(itemName, itemValue);
    }

    /**
     * @description Receive a jwt object, decode and return it.
     * @param jwt Jwt object;
     * @returns Returns the jwt object decoded.
     */
    public decodeJwtObject(jwt: string): any {
        const decodedObject = JSON.parse(atob(jwt.split('.')[1]));
        return decodedObject;
    }

    /**
     * @description Receive a public key and an item, after encrypted the item with the key and return it.
     * @param publicKey Public key string.
     * @param item Item that will be encrypted.
     * @returns Return the received item encrypted.
     */
    public encryptData(publicKey: string, item: any): any {
        const $encrypt = new JSEncrypt();
        $encrypt.setPublicKey(publicKey);
        return $encrypt.encrypt(item);
    }
}
