"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let ErrorService = class ErrorService {
    contructor() {
        this.handler = console.error;
    }
    setHandler(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.handler = callback;
        });
    }
    handle(uri, error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.handler({
                uri,
                error: error['message'] ? error['message'] : null,
                name: error['name'] ? error['name'] : null,
                line: error['lineNumber'] ? error['lineNumber'] : null,
                stack: error['stack'] ? error['stack'] : null,
            });
        });
    }
};
ErrorService = __decorate([
    inversify_1.injectable()
], ErrorService);
exports.ErrorService = ErrorService;
exports.ErrorServiceType = Symbol.for("ErrorService");
//# sourceMappingURL=ErrorService.js.map