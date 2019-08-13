"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const BrowserService_1 = require("./services/BrowserService");
const ErrorService_1 = require("./services/ErrorService");
const Scraper_1 = __importDefault(require("./classes/Scraper"));
exports.default = () => {
    let container = new inversify_1.Container();
    container.bind(BrowserService_1.BrowserServiceType).to(BrowserService_1.BrowserService).inSingletonScope();
    container.bind(ErrorService_1.ErrorServiceType).to(ErrorService_1.ErrorService).inSingletonScope();
    const scraper = container.resolve(Scraper_1.default);
    return scraper;
};
//# sourceMappingURL=index.js.map