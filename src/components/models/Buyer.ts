import {
    IBuyer,
    TValidationErrorMessages,
    TValidationRules,
} from "../../types";
import { isFilledString } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Buyer {
    private data: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: "",
    };
    private readonly validationRules: TValidationRules<IBuyer> = {
        payment: {
            validateFn: () => isFilledString(this.data.payment.toString()),
            message: "Необходимо укаазать вид оплаты",
        },
        email: {
            validateFn: () => isFilledString(this.data.email),
            message: "Необходимо укаазать email",
        },
        phone: {
            validateFn: () => isFilledString(this.data.phone),
            message: "Необходимо укаазать номер телефона",
        },
        address: {
            validateFn: () => isFilledString(this.data.address),
            message: "Необходимо укаазать адрес",
        },
    };
    constructor(private events: IEvents) {}

    setData(fields: Partial<IBuyer>): void {
        Object.assign(this.data, fields);
        this.events.emit("buyer:update", this.getData());
        this.notify()
    }

    getData(): IBuyer {
        return this.data;
    }

    clearData(): void {
        const freshBuyer = new Buyer(this.events);
        Object.assign(this.data, freshBuyer.data);
        this.notify()
    }

    validateData(): Partial<TValidationErrorMessages<IBuyer>> {
        const res: Partial<TValidationErrorMessages<IBuyer>> = {};
        (Object.keys(this.validationRules) as Array<keyof IBuyer>).forEach(
            (key) => {
                if (!this.validationRules[key].validateFn()) {
                    res[key] = this.validationRules[key].message;
                }
            },
        );
        return res;
    }

    private notify() {
        this.events.emit("model:buyer:update", this.data );
    }
}
