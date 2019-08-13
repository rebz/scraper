"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneObjectUpdateValues = (object, callback) => __awaiter(this, void 0, void 0, function* () {
    const clone = new Object;
    for (const key of Object.keys(object)) {
        clone[key] = yield callback(object[key]);
    }
    return clone;
});
exports.cleanScrapedValue = (s) => {
    if (!s)
        return null;
    return s.replace(/\r?\n|\r/g, '').trim();
};
//# sourceMappingURL=scrape.js.map