export class Item {
    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }

    get qty_on_hand() {
        return this._qty_on_hand;
    }

    set qty_on_hand(value) {
        this._qty_on_hand = value;
    }
    constructor(item_code, description, unit_price, qty_on_hand) {
        this._item_code = item_code;
        this._description = description;
        this._unit_price = unit_price;
        this._qty_on_hand = qty_on_hand;
    }
}