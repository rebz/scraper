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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const BrowserService_1 = require("./../services/BrowserService");
const ErrorService_1 = require("./../services/ErrorService");
const scrape_1 = require("../helpers/scrape");
let Scraper = class Scraper {
    constructor(browserService, errorService) {
        this.browserService = browserService;
        this.errorService = errorService;
        this.$selectors = {};
        this.$uri = '';
        this.$paginationSelector = '';
        this.$listening = false;
        this.$listenHandler = () => { };
        this.$data = {};
    }
    setConfig(config) {
        this.$uri = config.uri;
        this.$selectors = config.selectors;
        const { selector, handler } = config.pagination;
        this.$paginationHandler = handler;
        this.$paginationSelector = selector;
        return this;
    }
    scrape(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uri)
                this.$uri = yield uri;
            try {
                yield this.goToPage();
                this.$data = yield this.retrieveSelectorValues();
                (yield this.$listening) && this.$listenHandler(this.getData());
            }
            catch (e) {
                yield this.errorService.handle(this.$uri, e);
            }
        });
    }
    listen(listenHandler) {
        this.$listening = true;
        this.$listenHandler = listenHandler;
    }
    errors(errorHandler) {
        this.errorService.setHandler(errorHandler);
    }
    autoScrape() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.$paginationHandler || !this.$paginationSelector) {
                return false;
            }
            yield this.scrape();
            while (yield this.hasNext()) {
                const next = yield this.getNext();
                const uri = yield this.$paginationHandler(this.$uri, next);
                if (!uri || uri === this.$uri) {
                    yield this.errorService.handle(this.$uri, {
                        message: `Pagination Handler returned: ${uri}`,
                        name: 'Scraper Message',
                    });
                    break;
                }
                yield this.scrape(uri);
            }
            return false;
        });
    }
    goToPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectorCheck = Object.values(this.$selectors)[0];
            yield this.browserService.goTo(this.$uri, selectorCheck);
        });
    }
    retrieveSelectorValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectors = this.$selectors;
            const page = this.browserService;
            return yield scrape_1.cloneObjectUpdateValues(selectors, (selector) => __awaiter(this, void 0, void 0, function* () {
                return yield scrape_1.cleanScrapedValue(yield page.getValueFromSelector(selector));
            }));
        });
    }
    hasNext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.$paginationSelector) {
                return false;
            }
            return yield this.browserService.hasSelector(this.$paginationSelector);
        });
    }
    getNext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.$paginationSelector) {
                return false;
            }
            console.info('get next');
            console.info(this.$paginationSelector);
            return yield this.browserService.getUrisFromSelector(this.$paginationSelector);
        });
    }
    getData() {
        return {
            uri: this.$uri,
            scraped: this.$data
        };
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browserService.closeBrowser();
        });
    }
};
Scraper = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(BrowserService_1.BrowserServiceType)),
    __param(1, inversify_1.inject(ErrorService_1.ErrorServiceType)),
    __metadata("design:paramtypes", [BrowserService_1.BrowserService,
        ErrorService_1.ErrorService])
], Scraper);
exports.default = Scraper;
//# sourceMappingURL=Scraper.js.map