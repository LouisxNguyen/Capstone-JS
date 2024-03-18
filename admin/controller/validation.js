function Validation() {
    this.isNullOrEmpty = function (value, spanId, message) {
        if (value === "") {
            domID(spanId).innerHTML = message;
            return false;
        }

        domID(spanId).innerHTML = "";
        return true;
    };

    this.isLetter = function (value, spanId, message) {
        const pattern =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(pattern)) {
            domID(spanId).innerHTML = "";
            return true;
        }

        domID(spanId).innerHTML = message;
        return false;
    };

    this.isNumber = function (value, spanId, message) {
        const pattern = /^[0-9]+$/;
        if (value.match(pattern)) {
            domID(spanId).innerHTML = "";
            return true;
        }

        domID(spanId).innerHTML = message;
        return false;
    };

    this.isNumberAndLetter = function (value, spanId, message) {
        const pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s0123456789]+$";
        if (value.match(pattern)) {
            domID(spanId).innerHTML = "";
            return true;
        }

        domID(spanId).innerHTML = message;
        return false;
    };

    this.isLength = function (value, min, max, spanId, message) {
        const length = value.length;
        if(length => min && length <= max) {
            domID(spanId).innerHTML = "";
            return true;
        }

        domID(spanId).innerHTML = message;
        return false;
    };

}