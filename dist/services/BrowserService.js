"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const puppeteer = __importStar(require("puppeteer"));
const ErrorService_1 = require("./ErrorService");
let BrowserService = class BrowserService {
    constructor(errorService) {
        this.errorService = errorService;
    }
    goTo(uri, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageCheck();
            try {
                yield this.$page.goto(uri, {
                    waitUntil: 'networkidle2',
                    timeout: 3000000
                });
                yield this.$page.waitForSelector(selector);
            }
            catch (e) {
                return e;
            }
        });
    }
    getValueFromSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$page.evaluate((el) => document.querySelector(el) && document.querySelector(el).innerHTML, selector);
        });
    }
    getUrisFromSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('BrowserService->getUrisFromSelector()');
            console.info(selector);
            return yield this.$page.evaluate((el) => {
                const anchors = document.querySelector(el).getElementsByTagName('a');
                const links = {};
                for (let i = 0, length = anchors.length; i < length; i++) {
                    links[anchors[i].innerHTML] = anchors[i].getAttribute('href');
                }
                return links;
            }, selector);
        });
    }
    hasSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.$page.waitForSelector(selector, { timeout: 5000 });
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    newPage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$page = yield this.$browser.newPage();
        });
    }
    browserCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.$browser) {
                yield this.openBrowser();
            }
        });
    }
    pageCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browserCheck();
            if (!this.$page) {
                yield this.newPage();
            }
        });
    }
    openBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$browser = yield puppeteer.launch();
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$browser)
                yield this.$browser.close();
        });
    }
};
BrowserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ErrorService_1.ErrorServiceType)),
    __metadata("design:paramtypes", [ErrorService_1.ErrorService])
], BrowserService);
exports.BrowserService = BrowserService;
exports.BrowserServiceType = Symbol.for("BrowserService");
//# sourceMappingURL=BrowserService.js.map