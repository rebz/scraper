import "reflect-metadata";
import { Container } from "inversify";

declare global {
    type AnyClass = { new (): any };
}

export default class Application {
    
    protected app;
    public container: Container;
    public test = 'test';

    consutrctor() {
        this.app = this;
        this.container = new Container();
        return this;
    }

    public getContainer() {
        return this.container;
    }

    public bind<T>(abstract: string, concrete: AnyClass) {
        this.container.bind(abstract).to(concrete)
    }
}