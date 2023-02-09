let errors: {}[] = [];

export const validatorsContract = {
    isRequired: function (value: string, message: string) {
        if (!value || value.length <= 0)
            errors.push({ message: message });
    },

    hasMinLen: (value: string, min: number, message: string) => {
        if (!value || value.length < min)
            errors.push({ message: message });
    },

    hasMaxLen: (value: string, max: number, message: string) => {
        if (!value || value.length > max)
            errors.push({ message: message });
    },

    isFixedLen: (value: string, len: number, message: string) => {
        if (value.length != len)
            errors.push({ message: message });
    },

    isEmail: (value: string, message: string) => {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
            errors.push({ message: message });
    },

    getErrors: () => {
        return errors;
    },

    clear: () => {
        errors = [];
    },

    isValid: () => {
        return errors.length == 0;
    }
}
